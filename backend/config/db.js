import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `mongodb database connected successfully ${con.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`error in mongodb connection ${error}`.bgRed.white);
  }
};

export default connectDb;
