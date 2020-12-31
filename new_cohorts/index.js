// all the necessary modules
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
app.use(express.static(path.join(__dirname, "public")));
const logger = require("morgan");
const { response } = require("express");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);
app.use(cookieParser());


const knex = require("./db/client");



const cohortsRouter = require("./routes/cohorts");
app.use("/", cohortsRouter);

// This is us setting up a localhost server
const ADDRESS = "localhost";
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});
