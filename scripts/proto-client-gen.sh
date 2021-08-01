#!/bin/bash
mkdir -p ./client/src/proto

protoc -I. ./proto/chat-service.proto --js_out=import_style=commonjs:./client/src --grpc-web_out=import_style=typescript,mode=grpcwebtext:./client/src