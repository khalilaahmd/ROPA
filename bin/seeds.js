const mongoose = require ('mongoose');

const User = require('../models/User.model');

mongoose
        .connect(`mongodb://127.0.0.1:27017/RoPA-Project`)
        .then((x) => console.log(`connected to Mongo Database name: '${x.connections[0].name}'`))
        .catch(err => console.error ('error connecting to mongo', err));

const testUser = [
    {
        username: 'TestRobot',
        email: 'test@gmail.com',
        passwordHash: 'RoPA-2023',
    }
];

User
    .create (testUser)
    .then (dbUsers => {
        console.log(`Created ${dbUsers.length} users`);
        mongoose.connection.close();
    })
    .catch (err => console.log(`An error occurred while create a test user in the DB: ${err}`));


    const ROPA = require('../models/Department.model')

    const testRoPA = [
        {
            departmentName: 'compliance',
            purposeOfProcessing: 'Testing',
            legalBasis: 'testing'
        }
    ];
    ROPA 
        .create(testRoPA)
        .then (dbROPA => {
            console.log(`Created ${dbROPA.length}`);
            mongoose.connection.close();
        })
        .catch (err => console.log('an error ocurred while creating ROPA test'))