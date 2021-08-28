/** @format */
import redis from 'redis';
import { User } from '../proto/chatServicePackage/User';
const client = redis.createClient();

client.on('error', console.error);
client.on('connect', console.log);

const REDIS_KEY = {
    broadcastChannel: 'room:0:messages',
    users: 'users',
};

type ErrCb<T> = (err: Error | null, data: T | null) => void;

export type Message = {
    userId: number;
    message: string;
    avatar: string;
};

export const addUser = (user: User, fn?: ErrCb<number>) => {
    client.rpush(REDIS_KEY.users, JSON.stringify(user), fn);
};

export const listUsers = (fn: ErrCb<Array<User>>) => {
    client.lrange(REDIS_KEY.users, 0, -1, (err, rows) => {
        if (err) return fn(err, []);
        const userList: Array<User> = [];
        for (const row of rows) {
            const user = JSON.parse(row) as User;
            userList.push(user);
        }
        fn(err, userList);
    });
};

export const updateUser = (user: User, fn: ErrCb<unknown>) => {
    listUsers((err, users) => {
        if (err) return fn(err, null);

        const index = users?.findIndex((u) => u?.id === user.id) as number;
        if (index === -1) {
            return fn(new Error('User is not found'), null);
        }
        client.lset(REDIS_KEY.users, index, JSON.stringify(user), fn);
    });
};

export const findUser = (username: string, fn: ErrCb<User>) => {
    listUsers((err, users) => {
        if (err) return fn(err, null);
        const user = users?.find((u) => u?.name === username);
        if (!user) {
            return fn(null, null);
        }
        return fn(null, user);
    });
};

export const findUserById = (id: number, fn: ErrCb<User>) => {
    listUsers((err, users) => {
        if (err) return fn(err, null);
        const user = users?.find((u) => u?.id === id);
        if (!user) {
            return fn(null, null);
        }
        return fn(null, user);
    });
};

export const addMessageToRoom = (message: Message, fn: ErrCb<number>) => {
    client.rpush(REDIS_KEY.broadcastChannel, JSON.stringify(message), fn);
};

export const getAllRoomMessage = (fn: ErrCb<Array<Message>>) => {
    client.lrange(REDIS_KEY.broadcastChannel, 0, -1, (err, rows) => {
        if (err) return fn(err, null);
        const msgs: Array<Message> = [];
        for (const row of rows) {
            const msg = JSON.parse(row) as Message;
            msgs.push(msg);
        }
        return fn(null, msgs);
    });
};
