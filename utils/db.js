import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const uri = `mongodb://${host}:${port}/${database}`;

    this.client = MongoClient(`mongodb://${host}:${port}/${database}`);
    this.client.connect();
    /*const client = new MongoClient(uri, {
      useUnifiedTopology: true,
      useUnifiedTopology: true,
      }); */
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

    async nbFiles() {
      return this.db.collection('files').countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
