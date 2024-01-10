const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({

    email:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    //the reason for the square bracket is because a user can create more than one event
    createdEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);