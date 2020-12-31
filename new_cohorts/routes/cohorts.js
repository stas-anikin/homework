const express = require('express');
const knex = require('../db/client');
const router = express.Router();

// Index
router.get("/cohorts", (request, response) => {
  knex("cohorts")
    .orderBy("id", "desc")
    .then((cohorts) => {
      response.render("cohorts", { cohorts: cohorts });
    });
});



// GET REQUESTS
router.get("/home", (request, response) => {
  response.render("home");
});
router.get("/new_cohort", (request, response) => {
  response.render("new_cohort", { cohort: false });
});

// CREATE - this code works, above is experimental

router.post("/create", (request, response) => {

  knex("cohorts")
  
  .insert({
  
  name: request.body.name,
  
  logo_url: request.body.logo_url,
  
  members: request.body.members
  
  })
  
  .returning("*")
  
  .then((cohorts) => {
  
  const cohort = cohorts[0];
  
  response.redirect(`view/${cohort.id}`);
  
  });
  
  });
  
  
  
router.get("/view/:id", (request, response) => {
  knex("cohorts")
    .where("id", request.params.id)
    .first()
    .then((cohort) => {
      if (!cohort) {
        response.send("No such cohort");
      } else {
        response.render("view", { cohort: cohort });
      }
    });
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
    members: request.body.members
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