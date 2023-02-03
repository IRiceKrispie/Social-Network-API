const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        reactions: [reactionSchema],
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
//virtual for reactionCount
thoughtSchema
    .virtual('reactionCount')
    .get(function (){
        return `${this.reactions.length}`;
    })
    .set(function(v) {
        const length = v;
        this.set({length});
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;