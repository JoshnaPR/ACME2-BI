const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    attendees: [{
        name: String,
        sizeBefore: String,
        sizeAfter: String,
        braSize1: String,
        braSize2: String,
        fitterName: String,
        phoneNumber: String,
        email: String,
        done: { type: Boolean, default: false },
    }],
});

eventSchema.pre('save', function (next) {
    this.numberOfAttendees = this.attendees.length;
    next();
});

const Event = mongoose.model('Events', eventSchema);
module.exports = Event;