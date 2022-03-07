// Load in express
const express = require("express");
const app = express();

const path = require("path");

// Sequelize
const sequelize = require("./config/connection");

// Handlebars templates
const exphbs = require("express-handlebars");
const hbs = exphbs.create({
  /* any custom helpers go here */
});
// Set the handlebars engine
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes - Directly require it in the app.use()
app.use(require("./controllers/index"));

// Server
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false /* alter: true */ }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
});
