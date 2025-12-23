import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Database is Connected:`);
    // console.log(`MongoDB Connected: ${conn.connection.host}`); //MongoDB Connected is Connected: ac-fss3owq-shard-00-00.qupujn6.mongodb.net
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;