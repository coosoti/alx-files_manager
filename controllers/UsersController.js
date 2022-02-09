import { createHash } from 'crypto';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email) {
      res.status(400).send({ error: 'Missing email'});
      return;
    }
    if (!password) {
      res.status(400).send({ error: 'Missing password '});
      return;
    }
    const users = dbClient.db.collection('users');

    const user = await users.findOne({ email });

    if (user) {
      res.status(400).send({ error: 'Alredy exist '});
      return;
    }

    const hashPwd = createHash('sha256').update(password).digest('hex');
    const newUser = await users.insertOne({
      email,
      password: hashPwd,
    });
    res.status(201).send({
      id: newUser.insertedId,
      email,
    });
  }
}

module.exports = UsersController;
