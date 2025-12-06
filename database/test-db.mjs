import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI must be set in .env");
    process.exit(1);
  }

  try {
    const startedAt = Date.now();
    await mongoose.connect(uri, { bufferCommands: false });
    const elapsed = Date.now() - startedAt;

    const dbName = mongoose.connection?.name || "(unKnown)";
    const host = mongoose.connection?.host || "(unKnown)";

    console.log(
      `Ok: Connected to Mongodb [db=${dbName}, host=${host}, time:${elapsed}]`
    );
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error: Unable to connect to MongoDB:", err);
    try {
      await mongoose.connection.close();
    } catch {}
    process.exit(1);
  }
}

main();
