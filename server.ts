import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/chat-service';
import { ChatServiceHandlers } from './proto/chatServicePackage/ChatService';
import {
    addMessageToRoom,
    addUser,
    findUser,
    findUserById,
    getAllRoomMessage,
    listUsers,
    Message,
    updateUser,
} from './redis/data_layer';
import { User } from './proto/chatServicePackage/User';
import { Status } from './proto/chatServicePackage/Status';
import { StreamRequest__Output } from './proto/chatServicePackage/StreamRequest';
import { StreamMessage } from './proto/chatServicePackage/StreamMessage';
import { UserStreamResponse } from './proto/chatServicePackage/UserStreamResponse';
import { emitMainChatRoomUpdate, listenMainChatRoomUpdate, listenUserUpdate } from './pub_sub';

const PORT = process.env.PORT || 8000;
const PROTO_FILE = 'proto/chat-service.proto';

const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;
const chatServicePkg = grpcObj.chatServicePackage;
const messageStreamByUserId = new Map<
    number,
    grpc.ServerWritableStream<StreamRequest__Output, StreamMessage>
>();
const userStreamByUserId = new Map<
    number,
    grpc.ServerWritableStream<StreamRequest__Output, UserStreamResponse>
>();

function getServer() {
    const server = new grpc.Server();
    server.addService(chatServicePkg.ChatService.service, {
        ChatInitateRequest: (call, callback) => {
            const sessionName = call.request.name || '';
            const avatar = call.request.avatarUrl || '';
            if (!sessionName || !avatar) {
                return callback(new Error('Name and Avatar required'));
            }
            findUser(sessionName, (err, dbUser) => {
                if (err) return callback(err);
                //if the user doesn't exists in db start storing them
                if (!dbUser) {
                    const newUser: User = {
                        id: Math.random(),
                        status: Status.Online,
                        name: sessionName,
                        avatarUrl: avatar,
                    };
                    addUser(newUser, (err) => {
                        if (err) return err;
                        return callback(null, { id: newUser.id });
                    });
                } else {
                    //if user already online and trying to send initate request to server
                    if (dbUser.status === Status.Online) {
                        return callback(new Error('User exist and is online'));
                    } else {
                        dbUser.status = Status.Online;
                        updateUser(dbUser, (err) => {
                            if (err) return callback(err);
                            return callback(null, { id: dbUser.id });
                        });
                    }
                }
            });
        },
        SendMessage: (call, callback) => {
            const { id = -1, message = '' } = call.request;
            if (!id || !message) return callback(new Error('IDK who you are ?'));
            findUserById(id, (err, user) => {
                if (err) return callback(err);
                const msg = {
                    userId: user?.id,
                    message: message,
                    avatar: user?.avatarUrl,
                } as Message;
                addMessageToRoom(msg, (err) => {
                    if (err) return callback(err);
                    //emit the message into channel<MAIN_ROOM>
                    emitMainChatRoomUpdate(msg);
                    return callback(null);
                });
            });
        },
        ChatStream: (call) => {
            const { id = -1 } = call.request;
            if (!id) return call.end();
            findUserById(id, (err, user) => {
                if (err) return call.end();
                getAllRoomMessage((err, msgs) => {
                    if (err) return call.end();
                    if (msgs != null) {
                        for (const msg of msgs) {
                            call.write(msg);
                        }
                        messageStreamByUserId.set(user?.id as number, call);
                    }
                });
                call.on('cancelled', () => {
                    if (user != null) {
                        user.status = Status.Offline;
                        updateUser(user as User, (err) => {
                            if (err) console.error(err);
                            messageStreamByUserId.delete(user?.id as number);
                        });
                    }
                });
            });
        },
        UserStream: (call) => {
            const { id = -1 } = call.request;
            if (!id) return call.end();
            findUserById(id, (err, user) => {
                if (err) return call.end();
                listUsers((err, users) => {
                    if (err) call.end();
                    call.write({ user: users as User[] });
                    userStreamByUserId.set(user?.id as number, call);
                });
                call.on('cancelled', () => userStreamByUserId.delete(user?.id as number));
            });
        },
    } as ChatServiceHandlers);
    return server;
}

//initialize the listening events
const setupPubSub = () => {
    listenMainChatRoomUpdate((data, channel) => {
        console.log(`Message Broadcasted From ${channel} Channel`);
        for (const [_, msgCall] of messageStreamByUserId) {
            msgCall.write(data);
        }
    });
    listenUserUpdate(() => {
        listUsers((err, users) => {
            if (err) return console.error(err);
            for (const [_, usrCall] of userStreamByUserId) {
                usrCall.write({ user: users as User[] });
            }
        });
    });
};

function main() {
    const server = getServer();
    server.bindAsync(`127.0.0.1:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server is running on PORT:${port}`);
        //start server
        server.start();
        //start subsub instance
        setupPubSub();
    });
}

main();
