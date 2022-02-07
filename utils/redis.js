import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => {
      console.log('Error ', err);
    });

  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = this.getAsync(key);
    return value;
  }

  async set(key, value, time) {
    return this.client.setex(key, time, value);
  }

  async del(key) {
    return this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
