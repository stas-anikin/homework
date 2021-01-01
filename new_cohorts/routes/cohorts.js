// requiring all the necessary modules
const express = require("express");
const knex = require("../db/client");
const router = express.Router();
// this is a function that will create random teams
const Randomizer = require("../randomizer.js"); 
const randomizeTeams = Randomizer.RandomizeTeams;
const NumberOfTeams = Randomizer.NumberOfTeams;

// Index
router.get("/", (request, response) => {
  response.redirect("/cohorts");
});
router.get("/cohorts", (request, response) => {
  knex("cohorts")
    .orderBy("id", "desc")
    .then((cohorts) => {
      response.render("cohorts", { cohorts: cohorts });
    });
});

// error page
router.get("/error", (request, response) => {
  response.render("error");
});
// New cohort page
router.get("/new_cohort", (request, response) => {
  response.render("new_cohort", { cohort: false });
});

// CREATE

router.post("/create", (request, response) => {
  knex("cohorts")
    .insert({
      name: request.body.name,
      logo_url: request.body.logo_url,
      members: request.body.members,
    })
    .returning("*")
    .then((cohorts) => {
      const cohort = cohorts[0];
      response.redirect(`view/${cohort.id}`);
    });
});

// view a specific cohort
router.get("/view/:id", (request, response) => {
  const cohortId = request.params.id; //get the id of the cohort from url params
  const method = request.query.method; //method to randomize the teams
  const number = parseInt(request.query.quantity); //number of teams/per team
  let error = null;
  let randomizedTeams = []; //empty array to hold our new teams
  if (!method) { //this checks whether it is a user simply viewing the cohort or if we need to create teams
    {
      knex("cohorts")
        .where("id", request.params.id)
        .first()
        .then((cohort) => {
          if (!cohort) {
            response.send("No such cohort");
          } else {
            response.render("view", { cohort: cohort, number: "", method: "" }); //passing back number and method as empty so that the page can be viewed normally
          }
        });
    }
  } else { 
    knex
      .select("*")
      .from("cohorts")
      .where({ id: cohortId })
      .then((results) => {
        const [cohort] = results;
        let teams = cohort.members; //getting members from the database and assigning them to var teams

        if (number > teams.split(",").length) { //checking whether the number is valid
          response.render("error");
          error = "number of teams must be between 1 and number of members";
        } else {
          if (method === "per_team") {
            randomizedTeams = randomizeTeams(teams, number);
          } else {
            randomizedTeams = NumberOfTeams(teams, number);
          }
          response.render("view", { //we are loading the same page but with new data that will now be visible
            cohort: cohort || {},
            method: method,
            teams: randomizedTeams,
            number: number,
          });
        }
      });
  }
});

// EDIT
router.get("/edit/:id", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .first()
    .then((cohort) => {
      response.render("edit", { cohort: cohort });
    });
});

// UPDATE
router.patch("/:id", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .update({
      name: request.body.name,
      logo_url: request.body.logo_url,
      members: request.body.members,
    })
    .then(() => {
      response.redirect("cohorts");
    });
});

// DELETE /:id
router.delete("/:id", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .del()
    .then(() => {
      response.redirect("cohorts");
    });
});
module.exports = router;
