import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatServiceClient as _chatServicePackage_ChatServiceClient, ChatServiceDefinition as _chatServicePackage_ChatServiceDefinition } from './chatServicePackage/ChatService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatServicePackage: {
    ChatService: SubtypeConstructor<typeof grpc.Client, _chatServicePackage_ChatServiceClient> & { service: _chatServicePackage_ChatServiceDefinition }
    InitateRequest: MessageTypeDefinition
    InitateResponse: MessageTypeDefinition
    MessageRequest: MessageTypeDefinition
    Status: EnumTypeDefinition
    StreamMessage: MessageTypeDefinition
    StreamRequest: MessageTypeDefinition
    User: MessageTypeDefinition
    UserStreamResponse: MessageTypeDefinition
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

