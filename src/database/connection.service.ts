import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongoUrl: string = process.env.MONGO_URL ?? '';
const client = new MongoClient(mongoUrl);

async function connect() {
  await client.connect();
  console.log('Connected successfully to mongo');
  return client.db();
}

export { client, connect };
