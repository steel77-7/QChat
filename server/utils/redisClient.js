import {createClient} from "redis";
import ApiResponse from "./ApiResponse.js";
const DEFAULT_EXPIRATION = 3600;
export const redis_client =async ()=>{
  const client = createClient()


  
  try {
    await client.on('error', err => console.log('Redis Client Error', err))
    .connect();
    await client.set('key', 'value');
    const value = await client.get('key');
   // console.log(value)
   // console.log('redis connected',client)
    return client
  } catch (error) {
    console.error(error)
    throw error;
  }
} 


export async  function getOrSetCache(key, cb) {
  const client = await redis_client()
  return new Promise(async (reject, resolve) => {
    //console.log("here too",client);
    await client.get(key, async (err, data) => {
      if (err) return reject(new ApiResponse(500, "Server Error (redis)"));
      if (data !== null) return resolve(JSON.parse(data));
      const freshData = await cb();
      client.set(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
      resolve(freshData);
    });
  });
}
