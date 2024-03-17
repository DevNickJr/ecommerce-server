import { createClient } from 'redis';

const port = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD || "";
const host = process.env.REDIS_HOST || "";

if (!port || !password || !host) {
    throw new Error("Configuration variables for Redis not found")
}

const client = createClient({
    password,
    socket: {
        host,
        port: Number(port)
    }
});

client.on('error', err => console.log('Redis Client Error', err));


const connectRedis = async () => {
    await client.connect();
    console.log('Redis Connected Successfully');

}



export {
    connectRedis,
    client
}