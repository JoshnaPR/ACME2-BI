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
const Event = require("./Models/Events");
const Bra = require("./Models/Bra");

// Import Routes
const eventRoutes = require("./Routes/eventRoutes");
const braRoutes = require("./Routes/braRoutes");
const userRoutes = require("./Routes/userRoutes");
const logRoutes = require("./Routes/logRoute");

// Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/bras", braRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
