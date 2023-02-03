const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v){
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a valid email"
            },
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);