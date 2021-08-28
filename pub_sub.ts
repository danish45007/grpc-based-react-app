import { User } from './proto/chatServicePackage/User';
import { Message, nrp } from './redis/data_layer';

const REDIS_CHANNELS = {
    mainRoom: 'MAIN_ROOM',
    userChange: 'USER_CHANGE',
};

export type listenFnCb<T> = (data: T, channel: string) => void;

export const emitMainChatRoomUpdate = (msg: Message) => {
    nrp.emit(REDIS_CHANNELS.mainRoom, JSON.stringify(msg));
};

export const listenMainChatRoomUpdate = (fn: listenFnCb<Message>) => {
    nrp.on(REDIS_CHANNELS.mainRoom, (data, channel) => {
        const msg = JSON.parse(data) as Message;
        fn(msg, channel);
    });
};

export const emitUserUpdate = (user: User) => {
    nrp.emit(REDIS_CHANNELS.userChange, JSON.stringify(user));
};

export const listenUserUpdate = (fn: listenFnCb<User>) => {
    nrp.on(REDIS_CHANNELS.userChange, (data, channel) => {
        const user = JSON.parse(data) as User;
        fn(user, channel);
    });
};
