const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reactions');
const formatDate = require('../utils/formatDate');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        // Configuration options
        toJSON: {
            virtuals:true,
            getters: true,
        },
    }
);

thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;