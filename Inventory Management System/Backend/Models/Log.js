const mongoose = require("mongoose");
const { Schema } = mongoose;

const logSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;