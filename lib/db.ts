import mongoose from "mongoose";

/**
 * @source https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
 */

const { MONGO } = process.env;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

// @ts-ignore
let cached = global.mongoose;
if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGO)
    throw new TypeError(
      "MONGO environment variable is not set. Set it to the MongoDB URI."
    );

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      dbName: "compositr"
    };

    cached.promise = mongoose.connect(MONGO, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
