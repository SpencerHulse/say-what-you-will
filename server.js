// Load in express
const express = require("express");
const app = express();

const path = require("path");

// Handlebars templates
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  /* any custom helpers go here */
});

const routes = require("./controllers/index");

// Set the handlebars engine
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
