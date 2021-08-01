import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class InitateRequest extends jspb.Message {
  getName(): string;
  setName(value: string): InitateRequest;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): InitateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InitateRequest): InitateRequest.AsObject;
  static serializeBinaryToWriter(message: InitateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitateRequest;
  static deserializeBinaryFromReader(message: InitateRequest, reader: jspb.BinaryReader): InitateRequest;
}

export namespace InitateRequest {
  export type AsObject = {
    name: string,
    avatarUrl: string,
  }
}

export class InitateResponse extends jspb.Message {
  getId(): number;
  setId(value: number): InitateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InitateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InitateResponse): InitateResponse.AsObject;
  static serializeBinaryToWriter(message: InitateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InitateResponse;
  static deserializeBinaryFromReader(message: InitateResponse, reader: jspb.BinaryReader): InitateResponse;
}

export namespace InitateResponse {
  export type AsObject = {
    id: number,
  }
}

export class MessageRequest extends jspb.Message {
  getId(): number;
  setId(value: number): MessageRequest;

  getMessage(): string;
  setMessage(value: string): MessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageRequest): MessageRequest.AsObject;
  static serializeBinaryToWriter(message: MessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageRequest;
  static deserializeBinaryFromReader(message: MessageRequest, reader: jspb.BinaryReader): MessageRequest;
}

export namespace MessageRequest {
  export type AsObject = {
    id: number,
    message: string,
  }
}

export class StreamRequest extends jspb.Message {
  getId(): number;
  setId(value: number): StreamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamRequest): StreamRequest.AsObject;
  static serializeBinaryToWriter(message: StreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamRequest;
  static deserializeBinaryFromReader(message: StreamRequest, reader: jspb.BinaryReader): StreamRequest;
}

export namespace StreamRequest {
  export type AsObject = {
    id: number,
  }
}

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getName(): string;
  setName(value: string): User;

  getStatus(): string;
  setStatus(value: string): User;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    name: string,
    status: string,
    avatarUrl: string,
  }
}

export class UserStreamResponse extends jspb.Message {
  getUserList(): Array<User>;
  setUserList(value: Array<User>): UserStreamResponse;
  clearUserList(): UserStreamResponse;
  addUser(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserStreamResponse): UserStreamResponse.AsObject;
  static serializeBinaryToWriter(message: UserStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStreamResponse;
  static deserializeBinaryFromReader(message: UserStreamResponse, reader: jspb.BinaryReader): UserStreamResponse;
}

export namespace UserStreamResponse {
  export type AsObject = {
    userList: Array<User.AsObject>,
  }
}

export class StreamMessage extends jspb.Message {
  getId(): number;
  setId(value: number): StreamMessage;

  getMessage(): string;
  setMessage(value: string): StreamMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StreamMessage): StreamMessage.AsObject;
  static serializeBinaryToWriter(message: StreamMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamMessage;
  static deserializeBinaryFromReader(message: StreamMessage, reader: jspb.BinaryReader): StreamMessage;
}

export namespace StreamMessage {
  export type AsObject = {
    id: number,
    message: string,
  }
}

export enum Status { 
  UNKOWN = 0,
  ONLINE = 1,
  OFFLINE = 2,
}
