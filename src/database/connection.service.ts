import { Request, Response } from 'express';
import 'dotenv/config';
import { MongoClient, Db, Collection } from 'mongodb';
import { Log } from './models/log.dto';

const mongoUrl: string = process.env.MONGO_URL ?? '';
const client = new MongoClient(mongoUrl);

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    await client.connect();
    const database: Db = client.db('logs');
    const collection: Collection<Log> = database.collection('log');
    const logs: Log[] = await collection.find().toArray();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await client.close();
  }
};

export const writeLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    await client.connect();
    const database: Db = client.db('logs');
    const collection: Collection<Log> = database.collection('log');
    const log: Log = req.body;
    await collection.insertOne(log);
    res.status(201).json({ message: 'Log created' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  } finally {
    await client.close();
  }
};