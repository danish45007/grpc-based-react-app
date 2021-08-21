/**
 * @fileoverview gRPC-Web generated client stub for chatServicePackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */
// @ts-nocheck

import * as grpcWeb from 'grpc-web';

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';
import * as proto_chat$service_pb from '../proto/chat-service_pb';

export class ChatServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string };
  options_: null | { [index: string]: any };

  constructor(
    hostname: string,
    credentials?: null | { [index: string]: string },
    options?: null | { [index: string]: any }
  ) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoChatInitateRequest = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_chat$service_pb.InitateResponse,
    (request: proto_chat$service_pb.InitateRequest) => {
      return request.serializeBinary();
    },
    proto_chat$service_pb.InitateResponse.deserializeBinary
  );

  chatInitateRequest(
    request: proto_chat$service_pb.InitateRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<proto_chat$service_pb.InitateResponse>;

  chatInitateRequest(
    request: proto_chat$service_pb.InitateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.Error,
      response: proto_chat$service_pb.InitateResponse
    ) => void
  ): grpcWeb.ClientReadableStream<proto_chat$service_pb.InitateResponse>;

  chatInitateRequest(
    request: proto_chat$service_pb.InitateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.Error,
      response: proto_chat$service_pb.InitateResponse
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ + '/chatServicePackage.ChatService/ChatInitateRequest',
        request,
        metadata || {},
        this.methodInfoChatInitateRequest,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ + '/chatServicePackage.ChatService/ChatInitateRequest',
      request,
      metadata || {},
      this.methodInfoChatInitateRequest
    );
  }

  methodInfoSendMessage = new grpcWeb.AbstractClientBase.MethodInfo(
    google_protobuf_empty_pb.Empty,
    (request: proto_chat$service_pb.MessageRequest) => {
      return request.serializeBinary();
    },
    google_protobuf_empty_pb.Empty.deserializeBinary
  );

  sendMessage(
    request: proto_chat$service_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null
  ): Promise<google_protobuf_empty_pb.Empty>;

  sendMessage(
    request: proto_chat$service_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (
      err: grpcWeb.Error,
      response: google_protobuf_empty_pb.Empty
    ) => void
  ): grpcWeb.ClientReadableStream<google_protobuf_empty_pb.Empty>;

  sendMessage(
    request: proto_chat$service_pb.MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (
      err: grpcWeb.Error,
      response: google_protobuf_empty_pb.Empty
    ) => void
  ) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ + '/chatServicePackage.ChatService/SendMessage',
        request,
        metadata || {},
        this.methodInfoSendMessage,
        callback
      );
    }
    return this.client_.unaryCall(
      this.hostname_ + '/chatServicePackage.ChatService/SendMessage',
      request,
      metadata || {},
      this.methodInfoSendMessage
    );
  }

  methodInfoUserStream = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_chat$service_pb.UserStreamResponse,
    (request: proto_chat$service_pb.StreamRequest) => {
      return request.serializeBinary();
    },
    proto_chat$service_pb.UserStreamResponse.deserializeBinary
  );

  userStream(
    request: proto_chat$service_pb.StreamRequest,
    metadata?: grpcWeb.Metadata
  ) {
    return this.client_.serverStreaming(
      this.hostname_ + '/chatServicePackage.ChatService/UserStream',
      request,
      metadata || {},
      this.methodInfoUserStream
    );
  }

  methodInfoChatStream = new grpcWeb.AbstractClientBase.MethodInfo(
    proto_chat$service_pb.StreamMessage,
    (request: proto_chat$service_pb.StreamRequest) => {
      return request.serializeBinary();
    },
    proto_chat$service_pb.StreamMessage.deserializeBinary
  );

  chatStream(
    request: proto_chat$service_pb.StreamRequest,
    metadata?: grpcWeb.Metadata
  ) {
    return this.client_.serverStreaming(
      this.hostname_ + '/chatServicePackage.ChatService/ChatStream',
      request,
      metadata || {},
      this.methodInfoChatStream
    );
  }
}
