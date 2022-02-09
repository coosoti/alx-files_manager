import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const redis = redisClient.isAlive();
    const db = dbClient.isAlive();
    res.status(200).send({ redis: redis, db: db });
  }

  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    res.status(200).send({ users: users, files: files });
  }
}

module.exports = AppController;
