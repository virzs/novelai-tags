/*
 * @Author: vir virs98@outlook.com
 * @Date: 2022-11-05 17:56:08
 * @LastEditors: vir virs98@outlook.com
 * @LastEditTime: 2022-11-15 23:20:33
 */

import mongoose from "mongoose";
import dbConfig from "../configs/dbConfig";

const { host, port, database, username, password, dataPath } = dbConfig;

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = await mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, opts);
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
};

export default dbConnect;
