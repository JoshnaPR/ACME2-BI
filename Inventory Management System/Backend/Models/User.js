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
// this ^ paragraph was to create the schema of what sort of information is required from the user

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified) return next();
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});
// this ^ paragraph was to create the password and hash it.

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// this ^ paragraph was to compare the password entered by the user with the hashed password in the database

const User = mongoose.model("User", userSchema);

module.exports = User;
