import mongoose from 'mongoose';
const uri =
    'mongodb+srv://andreiBlusher:4k7g5s54@cluster0.z5s6aaj.mongodb.net/?retryWrites=true&w=majority';

async function connectToMongoDb() {
    try {
        await mongoose.connect(uri);
        console.log('connection to the db established');
    } catch (e) {
        console.error(e);
    }
}

export default connectToMongoDb;