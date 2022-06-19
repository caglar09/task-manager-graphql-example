import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "@constants";

const options = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
};

const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

module.exports = pubsub;
