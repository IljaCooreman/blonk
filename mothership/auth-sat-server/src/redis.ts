import * as redis from 'redis';

export const redisClient = redis.createClient({
  host: 'redis-server',
  retry_strategy: () => 1000
});
export const publisher = redisClient.duplicate();
