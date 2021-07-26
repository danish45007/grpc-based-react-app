import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import readline from "readline";

const PORT = process.env.PORT || 8000;
const PROTO_FILE = "proto/random.proto";

const pkgDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(pkgDef) as unknown as ProtoGrpcType;
const client = new grpcObj.randomPackage.Random(
  `127.0.0.1:${PORT}`,
  grpc.credentials.createInsecure()
);

// add delay of 5 sec
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  client.PingPong({ message: "Ping" }, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
  const stream = client.RandomNumbers({ maxVal: 100 });
  stream.on("data", (chunck) => {
    console.log(chunck);
  });
  //event listener for end event
  stream.on("end", () => {
    console.log("Communication ended at server end");
  });
  const todoStream = client.TodoList((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(result);
  });
  todoStream.write({
    Todo: "add new feature to my golang code",
    status: "todo",
  });
  todoStream.write({ Todo: "add readme", status: "done" });
  todoStream.write({ Todo: "drink water", status: "done" });
  todoStream.write({ Todo: "walk the dog", status: "ongoing" });
  todoStream.end();

  const username = process.argv[2];
  if (!username)
    console.error("No user, can't join the chat!!!"), process.exit();
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const metadata = new grpc.Metadata();
  metadata.set("username", username);
  const call = client.Chat(metadata);
  call.write({
    message: "register",
  });

  //client receiving data back server
  call.on("data", (chunk) => {
    console.log(`${chunk.username} ==> ${chunk.message}`);
  });

  //client making request
  r1.on("line", (line) => {
    if (line === "quit") {
      call.end();
      //end program
      process.exit();
    } else {
      call.write({
        message: line,
      });
    }
  });
}
