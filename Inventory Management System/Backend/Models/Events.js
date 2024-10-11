const mongoose = require('mongoose');

const attendeeSchema = mongoose.Schema({
    name: {type: String, required: true},
    sizeBefore: {type: String, required: true},
    sizeAfter: {type: String, required: true},
    fitterName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
});

const eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    attendies: {type: Number, required: true},
});

eventSchema.pre('save', function (next) {
    this.numberOfAttendees = this.attendees.length;
    next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;