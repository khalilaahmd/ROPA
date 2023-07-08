// connect to mongoose
const mongoose = require ('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RoPA-Project';
mongoose
        .connect(MONGO_URI)
        .then((x) => console.log(`connected to Mongo Database name: '${x.connections[0].name}'`))
        .catch(err => console.error ('error connecting to mongo', err));