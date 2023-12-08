const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        required: true
    },
    email: String,
    products: [String]
});

module.exports = mongoose.model('User', userSchema);
