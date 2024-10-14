import Redis from "redis";
import ApiResponse from "./ApiResponse.js";
const DEFAULT_EXPIRATION = 3600;
export const redis_client = () =>Redis.createClient().on('error', err => console.log('Redis Client Error', err))
.connect().then(()=>console.log('redis')); //locally hosted

export  function getOrSetCache(key, cb) {
  return new Promise(async(reject, resolve) => {
    console.log(redis_client)
   await redis_client.get(key, async (err, data) => {
      if (err) return reject(new ApiResponse(500, "Server Error (redis)"));
      if (data !== null) return resolve(JSON.parse(data));
      const freshData = await cb();
      redis_client.set(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}
