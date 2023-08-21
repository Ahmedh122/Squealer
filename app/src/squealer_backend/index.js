const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server information
const dbName = 'squealerdb'; // Replace with your database name

async function connectToMongo() {
    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();

        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Now you can perform CRUD operations on the 'db' object
        // For example:
        const collection = db.collection('mycollection');
        
        // Insert a document
        await collection.insertOne({ name: 'John', age: 30 });

        // Find documents
        const documents = await collection.find().toArray();
        console.log('Documents:', documents);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        // Close the connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

connectToMongo();