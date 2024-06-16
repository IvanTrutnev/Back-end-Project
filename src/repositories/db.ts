import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.mongoUri;

export const client = new MongoClient(mongoUri as string);

export type ProductType = {
  id: number;
  title: string;
};

const db = client.db('shop');

export const productsCollection = db.collection<ProductType>('products');

export async function runDb() {
  console.log('try to connect db...');

  try {
    await client.connect();
    await client.db('products').command({ ping: 1 });
    console.log('Connected to db');
  } catch (e) {
    console.log('can not connect to db', e);
    await client.close();
  }
}
