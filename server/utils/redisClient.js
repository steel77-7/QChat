import Redis from "redis";
import ApiError from "./ApiError.js";
const DEFAULT_EXPIRATION = 3600;
export const redis_client = () => Redis.createClient(); //locally hosted

export function getOrSetCache(key, cb) {
  return new Promise((reject, resolve) => {
    redis_client.get(key, async (err, data) => {
      if (err) return reject(new ApiError(500, "Server Error (redis)"));
      if (data !== null) return resolve(JSON.parse(data));
      const freshData = await cb();
      redis_client.set(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}
