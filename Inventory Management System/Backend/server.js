const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Models
const Event = require("./Models/Events"); // Ensure this model exists
const Bra = require("./Models/Bra"); // Ensure this model exists

// Import Routes
const eventRoutes = require("./Routes/eventRoutes"); // Create this file
const braRoutes = require("./Routes/braRoutes"); // Create this file
const userRoutes = require("./Routes/userRoutes");

// Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/bras", braRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log("I am printing bro"));
