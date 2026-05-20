import mongoose from "mongoose";
import dns from "dns";

const connectDB = async () => {
  try {
    // force using public DNS servers to avoid local DNS/SRV resolution issues
    try {
      dns.setServers(["8.8.8.8", "8.8.4.4"]);
      // console.log("DNS servers set to:", dns.getServers());
    } catch (dnsErr) {
      console.warn("Could not set custom DNS servers:", dnsErr.message || dnsErr);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // don't exit immediately so we can inspect logs during development
    // process.exit(1);
  }
};

export default connectDB;
