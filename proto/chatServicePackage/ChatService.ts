// Original file: proto/chat-service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { InitateRequest as _chatServicePackage_InitateRequest, InitateRequest__Output as _chatServicePackage_InitateRequest__Output } from '../chatServicePackage/InitateRequest';
import type { InitateResponse as _chatServicePackage_InitateResponse, InitateResponse__Output as _chatServicePackage_InitateResponse__Output } from '../chatServicePackage/InitateResponse';
import type { MessageRequest as _chatServicePackage_MessageRequest, MessageRequest__Output as _chatServicePackage_MessageRequest__Output } from '../chatServicePackage/MessageRequest';
import type { StreamMessage as _chatServicePackage_StreamMessage, StreamMessage__Output as _chatServicePackage_StreamMessage__Output } from '../chatServicePackage/StreamMessage';
import type { StreamRequest as _chatServicePackage_StreamRequest, StreamRequest__Output as _chatServicePackage_StreamRequest__Output } from '../chatServicePackage/StreamRequest';
import type { UserStreamResponse as _chatServicePackage_UserStreamResponse, UserStreamResponse__Output as _chatServicePackage_UserStreamResponse__Output } from '../chatServicePackage/UserStreamResponse';

export interface ChatServiceClient extends grpc.Client {
  ChatInitateRequest(argument: _chatServicePackage_InitateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitateRequest(argument: _chatServicePackage_InitateRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitateRequest(argument: _chatServicePackage_InitateRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  ChatInitateRequest(argument: _chatServicePackage_InitateRequest, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitateRequest(argument: _chatServicePackage_InitateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitateRequest(argument: _chatServicePackage_InitateRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitateRequest(argument: _chatServicePackage_InitateRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  chatInitateRequest(argument: _chatServicePackage_InitateRequest, callback: (error?: grpc.ServiceError, result?: _chatServicePackage_InitateResponse__Output) => void): grpc.ClientUnaryCall;
  
  ChatStream(argument: _chatServicePackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_StreamMessage__Output>;
  ChatStream(argument: _chatServicePackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_StreamMessage__Output>;
  chatStream(argument: _chatServicePackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_StreamMessage__Output>;
  chatStream(argument: _chatServicePackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_StreamMessage__Output>;
  
  SendMessage(argument: _chatServicePackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatServicePackage_MessageRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatServicePackage_MessageRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  SendMessage(argument: _chatServicePackage_MessageRequest, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatServicePackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatServicePackage_MessageRequest, metadata: grpc.Metadata, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatServicePackage_MessageRequest, options: grpc.CallOptions, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  sendMessage(argument: _chatServicePackage_MessageRequest, callback: (error?: grpc.ServiceError, result?: _google_protobuf_Empty__Output) => void): grpc.ClientUnaryCall;
  
  UserStream(argument: _chatServicePackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_UserStreamResponse__Output>;
  UserStream(argument: _chatServicePackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_UserStreamResponse__Output>;
  userStream(argument: _chatServicePackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_UserStreamResponse__Output>;
  userStream(argument: _chatServicePackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatServicePackage_UserStreamResponse__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatInitateRequest: grpc.handleUnaryCall<_chatServicePackage_InitateRequest__Output, _chatServicePackage_InitateResponse>;
  
  ChatStream: grpc.handleServerStreamingCall<_chatServicePackage_StreamRequest__Output, _chatServicePackage_StreamMessage>;
  
  SendMessage: grpc.handleUnaryCall<_chatServicePackage_MessageRequest__Output, _google_protobuf_Empty>;
  
  UserStream: grpc.handleServerStreamingCall<_chatServicePackage_StreamRequest__Output, _chatServicePackage_UserStreamResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  ChatInitateRequest: MethodDefinition<_chatServicePackage_InitateRequest, _chatServicePackage_InitateResponse, _chatServicePackage_InitateRequest__Output, _chatServicePackage_InitateResponse__Output>
  ChatStream: MethodDefinition<_chatServicePackage_StreamRequest, _chatServicePackage_StreamMessage, _chatServicePackage_StreamRequest__Output, _chatServicePackage_StreamMessage__Output>
  SendMessage: MethodDefinition<_chatServicePackage_MessageRequest, _google_protobuf_Empty, _chatServicePackage_MessageRequest__Output, _google_protobuf_Empty__Output>
  UserStream: MethodDefinition<_chatServicePackage_StreamRequest, _chatServicePackage_UserStreamResponse, _chatServicePackage_StreamRequest__Output, _chatServicePackage_UserStreamResponse__Output>
}
