const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const db = require("./db.json"); // Assuming you have initial data in db.json
const bookRoutes = require("./routes/bookRoute");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const authenticationMiddleware = require("./auth/authenticationMiddleware");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(morgan("dev"));
// Use the cors middleware
app.use(cors());
// Passport Configuration
passport.use(authenticationMiddleware);
app.use(passport.initialize());

// Custom Middleware for Logging
app.use(loggingMiddleware);

// Routes
app.use("/api/books", bookRoutes);

// Custom Middleware for Error Handling
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
