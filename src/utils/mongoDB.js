
import mongoose from "mongoose";

// Function to connect to MongoDB using Mongoose
const connect = async () => {
  // Check if there is already an existing MongoDB connection
  if (mongoose.connections[0].readyState) return;
  try {
    // Connect to MongoDB using the connection URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo Connection successfully established.");
  } catch (error) {
    // Connect to MongoDB using the connection URI from environment variables
    console.error("Error connecting to Mongoose:", error);
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;



