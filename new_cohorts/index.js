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
app.get('/assign/:id', (request, response, next)=> {
  console.log(request.query)
  let error = null;
  let randomizedTeams = [];
  const members = request.query.members;
  const number = request.query.number;
  const method= request.query.method;
  // const {
  //     members,
  //     number,
  //     method
  // } = request.query
    console.log(request.query);
  response.cookie('members', request.query.names, {
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

  console.log(randomizedTeams)
  knex("cohorts")
  .where("id", request.params.id)
  .first()
  .then((cohort) => {
    if (!cohort) {
      response.send("No such cohort");
    } else {
        response.render(`assign/${cohort.id}`, {
      members: randomizedTeams,
      method: request.body.method,
      number: request.body.number,
      error: error
    })
  };

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
