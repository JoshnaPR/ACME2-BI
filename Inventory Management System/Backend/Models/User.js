const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: { type: String, required: [true, "Email is required!"], unique: true },
  password: { type: String, required: [true, "Password is required!"] },
  role: {
    type: String,
    required: [true, "Role is required!"],
    enum: ["Admin", "Volunteer"],
    default: "Volunteer",
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
