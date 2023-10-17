require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
// connect with mongo db database

const url = process.env.dburl; // Replace with your MongoDB server URL

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
} 

// Call the connectToMongoDB function to establish the connection
connectToMongoDB();

module.exports = {url,client,MongoClient};      