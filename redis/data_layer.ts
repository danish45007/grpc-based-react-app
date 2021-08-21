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

type ErrCb<T> = (err: Error, data: T) => void;
export const addUser = (user: User, fn?: ErrCb<number>) => {
    client.rpush(REDIS_KEY.users, JSON.stringify(user), fn);
};

export const listUsers = (fn?: ErrCb<Array<User>>) => {
    client.lrange(REDIS_KEY.users, 0, -1, (err, rows) => {
        if (err) return fn(err, []);
        const userList: Array<User> = [];
        for (const row of rows) {
            const user = JSON.parse(row) as User;
            userList.push(user);
        }
        return fn(err, userList);
    });
};

export const updateUser = (user: User) => {
    listUsers((err, users) => {
        if (err) return err;

        const index = users.findIndex((u) => u.id === user.id);
        if (index === -1) {
            return new Error('User is not found');
        }
    });
};
