const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const authRoutes = require("./routes/authRoutes");
const newcollecitonRoutes = require("./routes/newcollectionsRoutes");
const connectDB = require("./db");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

connectDB(); // Connect to MongoDB

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,x-auth-token"
};

// Enable CORS for all origins
app.use(cors(corsOptions));

// Limit each IP to 100 requests per windowMs (e.g., per 15 minutes)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   message: "Too many requests from this IP, please try again after 15 minutes",
// }); Tạm thời cmt cái này do cái lỗi nói request entity too large, phải làm rõ nó

// Apply the rate limiting middleware to all requests
// app.use(limiter);

app.use(bodyParser.json({ limit: "10mb" })); 

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/newcollections", newcollecitonRoutes);

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app; 