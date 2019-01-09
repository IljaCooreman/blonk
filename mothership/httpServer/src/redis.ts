import * as redis from 'redis';

export const redisClient = redis.createClient({
  host: 'redis-server',
  retry_strategy: () => {
    console.log('retry connecting to redis...')
    return 1000
  }
});
export const publisher = redisClient.duplicate();
