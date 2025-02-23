import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is set in `.env.local`
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ✅ Correctly return the database instance
export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("hb-fence-2025"); // ✅ Make sure to replace "parcelmint" with your actual DB name
}
