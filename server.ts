import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/chat-service';
import { ChatServiceHandlers } from './proto/chatServicePackage/ChatService';
import { addUser, listUsers, updateUser } from './redis/data_layer';
import { User } from './proto/chatServicePackage/User';
import { Status } from './proto/chatServicePackage/Status';

const PORT = process.env.PORT || 8000;
const PROTO_FILE = 'proto/chat-service.proto';

const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;
const chatServicePkg = grpcObj.chatServicePackage;

function getServer() {
    const server = new grpc.Server();
    server.addService(chatServicePkg.ChatService.service, {
        ChatInitateRequest: (call, callback) => {
            const sessionName = call.request.name || '';
            const avatar = call.request.avatarUrl || '';
            if (!sessionName || !avatar) {
                callback(new Error('Name and Avatar required'));
                return;
            }
            listUsers((err, users) => {
                if (err) return callback(err);
                const dbUser = users.find((user) => user.name.toLowerCase() === sessionName);
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
                }
                //if user already online and trying to send initate request to server
                if (dbUser.status === Status.Online) {
                    return callback(new Error('User exist and is online'));
                }
                dbUser.status = Status.Online;
                updateUser(dbUser);
            });
            callback(null, { id: Math.floor(Math.random() * 10000) });
        },
    } as ChatServiceHandlers);
    return server;
}

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
    });
}

main();
