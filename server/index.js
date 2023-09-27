const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const helmet = require("helmet");
const {authentication} = require("./middlewares/isAuthenticated")

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

// storing session in database
const store = new mongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions",
});

// express app
const app = express();

// implementing cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// implementing helmet to secure helmet server
app.use(helmet({ contentSecurityPolicy: false }));

app.use(express.json());

// session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: "false",
    saveUninitialized: true,
    store: store,
  })
);

// routes
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1/registerLogin", authRoutes);
const recordingRoutes = require("./routes/recording.routes");
app.use("/api/v1", authentication, recordingRoutes)

// server listening
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
