// import mongoose from "mongoose";

// const connectDB = async () =>{
//     try {
//         mongoose.connection.on("connected", ()=>{console.log("Database connected successfully!")})

//         let mongodbURI = process.env.MONGODB_URI ;
//         const projectName = 'AI-Resume-Builder';

//         if(!mongodbURI){
//             throw new Error("MONGODB_URI env variable not set")
//         }

//         if(mongodbURI.endsWith('/')){
//                 mongodbURI = mongodbURI.slice(0, -1);
//         }

//         await mongoose.connect(`${mongodbURI}/${projectName}`)

//     } catch (error) {
//         console.error("Error connecting to mongoDB :" , error );
//     }
// }

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI not found in env");
    }

    await mongoose.connect(uri);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
