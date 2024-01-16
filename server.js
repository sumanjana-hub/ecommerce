const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoute")
const productRoutes = require("./routes/productRoutes")

// Configure
require("dotenv").config();

// Rest object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'))

// Database config
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Rest API
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to the ecommerce app"
    });
});

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth", categoryRoutes);
app.use("/api/v1/auth", productRoutes);

// PORT
const port = 5008;

// Run listen
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
