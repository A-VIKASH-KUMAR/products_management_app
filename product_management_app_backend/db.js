const { MongoClient } = require('mongodb');
const path = require('path');
// Load the .env that sits next to this file, regardless of the process's
// current working directory (dotenv defaults to cwd, not __dirname).
require('dotenv').config({ path: path.join(__dirname, '.env') });
// NOTE: credentials should live in an environment variable, not in source.
// Set MONGODB_URI in your environment; the fallback is kept only so existing
// code keeps working during migration.
// Fall back to a local MongoDB instance so the app boots in development even
// when MONGODB_URI isn't set. In production, always provide MONGODB_URI.
const uri = process.env.MONGODB_URI;

const dbName = process.env.MONGODB_DB;

// A single MongoClient owns one connection pool. Reusing this one instance
// across the whole app is what "connection pooling" means with this driver —
// the driver hands out / reclaims sockets from the pool automatically.
const client = new MongoClient(uri, {
  maxPoolSize: 10, // max concurrent connections kept open
  minPoolSize: 0, // connections kept warm even when idle
  maxIdleTimeMS: 60000, // close a pooled connection after 60s idle
  serverSelectionTimeoutMS: 5000, // fail fast if no server is reachable
});

let connectPromise = null;

// Connect once and cache the promise so concurrent callers share the same
// in-flight connection instead of each opening their own.
async function connect() {
  if (!connectPromise) {
    connectPromise = client.connect().catch((err) => {
      connectPromise = null; // allow a retry on failure
      throw err;
    });
  }
  await connectPromise;
  return client.db(dbName);
}

// Convenience helper to grab a collection from the pooled connection.
async function getCollection(name) {
  const database = await connect();
  return database.collection(name);
}

// Gracefully drain the pool on shutdown.
async function close() {
  if (connectPromise) {
    await client.close();
    connectPromise = null;
  }
}

process.on('SIGINT', () => close().finally(() => process.exit(0)));
process.on('SIGTERM', () => close().finally(() => process.exit(0)));

module.exports = { client, connect, getCollection, close };
