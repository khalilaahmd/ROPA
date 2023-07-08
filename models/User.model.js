const { Schema, model } = require ('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'email is required.'],
            unique: true,
            lowercase: true,
            trim: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Password is required.']
        },
    },
    {
        timestamps: true
    }
);
const User = model('User', userSchema);
module.exports = User;