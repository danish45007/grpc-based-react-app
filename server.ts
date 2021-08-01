import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/chat-service';
import { ChatServiceHandlers } from './proto/chatServicePackage/ChatService';

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
      callback(null, { id: Math.floor(Math.random() * 10000) });
    },
  } as ChatServiceHandlers);
  return server;
}

function main() {
  const server = getServer();
  server.bindAsync(
    `127.0.0.1:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server is running on PORT:${port}`);
      //start server
      server.start();
    }
  );
}

main();
