import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("Testing MongoDB connection...");
console.log("MONGO_URI:", process.env.MONGO_URI.replace(/password/, "***"));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000
})
.then(() => {
  console.log("✅ MongoDB connection successful!");
  console.log("Connected to:", mongoose.connection.host);
  mongoose.connection.close();
  process.exit(0);
})
.catch((error) => {
  console.error("❌ MongoDB connection failed!");
  console.error("Error type:", error.name);
  console.error("Error message:", error.message);
  console.error("\nTroubleshooting tips:");
  console.error("1. Check MongoDB Atlas Network Access whitelist");
  console.error("2. Verify your IP address is allowed");
  console.error("3. Check your MONGO_URI in .env file");
  console.error("4. Ensure you have internet connectivity");
  process.exit(1);
});
