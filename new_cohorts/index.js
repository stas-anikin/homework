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
const Randomizer = require('./randomizer.js');
const randomizeTeams = Randomizer.RandomizeTeams;
const NumberOfTeams = Randomizer.NumberOfTeams;

const knex = require("./db/client");

//ASSIGNING TEAMS
app.post('/assign', (request, response, next)=> {
  // the req.body is the form data received from the submitted form
  // it's been added to req by the body-parser middleware
  let error = null;
  let randomizedTeams = [];
  const {
      members,
      number,
      method
  } = request.body
  console.log(request.body);
  response.cookie('members', request.body.names, {
      maxAge: 3000000
  });


  if (number > members.split(",").length) {
      error = "Number of teams must be between 1 and the number of members"
  } else {
      if (method === "per_team") {
          randomizedTeams = randomizeTeams(members, number)
      } else {
          randomizedTeams = NumberOfTeams(members, number)
      }
  }
  // res.send(req.body);
  // (NEW!) Shortcut Object creation syntax
  // { params } creates an object with a property named params and a value equal
  // to params (i.e. { params: params })
  console.log(randomizedTeams)

  response.redirect(`view/${cohort.id}`, {
      members: randomizedTeams,
      method: request.body.method,
      number: request.body.number,
      error: error
  });
  // passing an object as a second argument to render will make all properties
  // of that object available as variables inside the template
})

const cohortsRouter = require("./routes/cohorts");
app.use("/", cohortsRouter);

// This is us setting up a localhost server
const ADDRESS = "localhost";
const PORT = 3000;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});
