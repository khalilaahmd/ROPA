const session = require ('express-session');
const MongoStore = require('connect-mongo');
// Exporting middleware in the app.js to receive parameter
module.exports = app => {
    app.set('trust proxy', 1); 
// use session
    app.use(
        session({
            secret: 'Super safe secret', // to generate id for the session
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                               mongoUrl: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RoPA-Project',
                            // mongoUrl: process.env.URI || 'mongodb://127.0.0.1:27017/RoPA-Project',
            }),
            cookie: {
                httpOnly: true,
                maxAge: 500000
            },
        })
    );
};