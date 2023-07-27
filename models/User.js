const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        // Username field
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // Email field
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/\w+@\w+(\.\w{2,3})+/, "Invalid email"]
        },
        // Thoughts field (array of references to 'thought' documents)
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // Friends field (array of references to other 'user' documents)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Configuration options
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual getter for friendCount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;