const Event = require('../Models/Events');
// // GET all events
// exports.getAllEvents = async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.json(events);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // GET a single event by ID
// exports.getEventById = async (req, res) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) return res.status(404).json({ message: 'Event not found' });
//         res.json(event);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// POST a new event
exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// PUT update an event by ID
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
