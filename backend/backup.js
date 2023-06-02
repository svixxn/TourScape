const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const assert = require('assert');

const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })

const url = process.env.MONGO_URL;
const dbName = 'tourscape';


async function saveCollectionToFile(db, collectionName, client) {
   const collection = db.collection(collectionName);
   const cursor = collection.find();
 
   const filePath = `backup/${collectionName}.json`;
   const writeStream = fs.createWriteStream(filePath);
 
   const session = client.startSession();
   try {
     session.startTransaction();
 
     for await (const doc of cursor) {
       const docString = JSON.stringify(doc);
       writeStream.write(docString + '\n');
     }
 
     session.commitTransaction();
   } catch (err) {
     session.abortTransaction();
     throw err;
   } finally {
     session.endSession();
   }
 
   writeStream.end();
   console.log(`Collection '${collectionName}' saved to file '${filePath}'`);
 }
 
 
 

 async function saveAllCollections() {
   const client = new MongoClient(url);
 
   try {
     await client.connect();
     console.log('Connected to MongoDB');
 
     const db = client.db(dbName);
     const collections = await db.listCollections().toArray();
 
     for (const collection of collections) {
       await saveCollectionToFile(db, collection.name, client);
     }
   } catch (err) {
     console.error(err);
   } finally {
     client.close();
     console.log('Disconnected from MongoDB');
   }
 }
 
 saveAllCollections();
 

