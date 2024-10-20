const mongoose = require('mongoose');
const { type } = require('os');

const UserInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: Number, required: true},
});

const UserInfo = mongoose.model('UserInfo', UserInfoSchema);
module.exports = UserInfo;