import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async ()=> {
    console.log('mangoose.set');
    mongoose.set('strictQuery', true);
    console.log('fin mangoose.set');

    if (isConnected){
        console.log('MongoDB est connectée');
        return;
    }

    try {
        console.log('mangoose.connect');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:'readsnap',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //serverSelectionTimeoutMS: 30000, // 30 seconds
          })

        isConnected= true;
        console.log('MongDB connectée')

    } catch (error) {
        console.log('Erreur de mangoose.connect', error)        
        
    }
}