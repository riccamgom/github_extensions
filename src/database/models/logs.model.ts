import { Collection, Db } from 'mongodb';
import { LogDto } from '../../dtos/log.dto';

export class Logs {
  database: Db;
  collection: Collection;

  constructor(database: Db) {
    this.database = database;
    this.collection = this.database.collection('log');
  }

  async getLogs() {
    return this.collection.find().toArray();
  }

  async writeLogs(log: LogDto) {
    await this.collection.insertOne(log);
  }
}
