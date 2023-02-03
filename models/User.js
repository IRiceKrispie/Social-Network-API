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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
//virtual for friendCount
userSchema
    .virtual('friendCount')
    .get(function (){
        return `${this.friends.length}`;
    })
    .set(function(v) {
        const length = v;
        this.set({length});
    });

const User = model('user', userSchema);

module.exports = User;