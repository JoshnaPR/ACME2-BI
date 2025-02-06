const Log = require("../Models/Log");
const User = require("../Models/User");

async function logAction(userId, action) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for logging action.");
      return;
    }

    const logEntry = new Log({
      userId,
      username: user.username,
      fullName: `${user.firstName} ${user.lastName}`,
      role: user.role,
      action,
    });

    await logEntry.save();
    console.log("Log entry saved: ,", logEntry);
  } catch (error) {
    console.error("Error logging action:", error);
  }
}

exports.getLogs = async (req, res) => {
    try {
      const logs = await Log.find().populate("userId", "username fullName role").sort({ timestamp: -1 });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.createLog = async (req, res) => {
    const { userId, action } = req.body;
  
    if (!userId || !action) {
      return res.status(400).json({ message: "User ID and action are required" });
    }
  
    try {
      await logAction(userId, action);
      res.status(200).send("Action logged successfully");
    } catch (error) {
      res.status(500).send("Error logging action");
    }
  };