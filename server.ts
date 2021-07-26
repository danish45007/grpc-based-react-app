import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import { RandomHandlers } from "./proto/randomPackage/Random";
import { TodoResponse } from "./proto/randomPackage/TodoResponse";
import { ChatRequest } from "./proto/randomPackage/ChatRequest";
import { ChatResponse } from "./proto/randomPackage/ChatResponse";

const PORT = process.env.PORT || 8000;
const PROTO_FILE = "proto/random.proto";

const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;
const randomPkg = grpcObj.randomPackage;

const todoList: TodoResponse = { todos: [] };
const callObjectByUsername = new Map<
  string,
  grpc.ServerDuplexStream<ChatRequest, ChatResponse>
>();
function getServer() {
  const server = new grpc.Server();
  server.addService(randomPkg.Random.service, {
    //Unary RPC
    PingPong: (_, res) => {
      res(null, { message: "Pong" });
    },
    //Server streaming RPC
    RandomNumbers: (call) => {
      const { maxVal = 10 } = call.request;
      let runCount = 0;
      const id = setInterval(() => {
        runCount += 1;
        call.write({ num: Math.floor(Math.random() * maxVal) });
        if (runCount >= 10) {
          clearInterval(id);
          call.end();
        }
      }, 500);
    },
    // Client streaming RPC
    TodoList: (call, callback) => {
      call.on("data", (chunck) => {
        console.log(chunck);
        todoList.todos?.push(chunck);
      });
      call.on("end", () => {
        callback(null, { todos: todoList.todos });
        console.log("Communication ended from client's end");
      });
    },
    // Bidirectional streaming RPC
    Chat: (call) => {
      call.on("data", (req) => {
        const username = call.metadata.get("username")[0] as string;
        const msg = req.message;
        console.log(username, req.message);

        for (let [user, usersCall] of callObjectByUsername) {
          if (username !== user) {
            usersCall.write({
              username: username,
              message: msg,
            });
          }
        }

        if (callObjectByUsername.get(username) === undefined) {
          callObjectByUsername.set(username, call);
        }
      });

      call.on("end", () => {
        const username = call.metadata.get("username")[0] as string;
        callObjectByUsername.delete(username);
        for (let [user, usersCall] of callObjectByUsername) {
          usersCall.write({
            username: username,
            message: "Has Left the Chat!",
          });
        }
        console.log(`${username} is ending their chat session`);

        call.write({
          username: "Server",
          message: `See you later ${username}`,
        });

        call.end();
      });
    },
  } as RandomHandlers);

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
