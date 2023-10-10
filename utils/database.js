import mongoose from "mongoose";

let isConnected = false;  // is used to connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        // console.log('DB already connected')
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI_LOCAL, {
            dbName: "Promtify"
        });
        isConnected = true;
        console.log('DB Connected')
    } catch (error) {
        
    }
}