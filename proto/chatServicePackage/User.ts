// Original file: proto/chat-service.proto

import type { Status as chatServer_Status } from '../chatServicePackage/Status';
export interface User {
    id?: number;
    name?: string;
    status?: chatServer_Status | keyof typeof chatServer_Status;
    avatarUrl?: string;
}

export interface User__Output {
    id?: number;
    name?: string;
    status?: string;
    avatarUrl?: string;
}
