import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Already Connected to MONGODB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'share-prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("Connected to MONGODB");
    } catch (error) {
        console.log(error);
    }
}