const express = require('express');
const knex = require('../db/client');
const router = express.Router();
const Randomizer = require('../randomizer.js');
const randomizeTeams = Randomizer.RandomizeTeams;
const NumberOfTeams = Randomizer.NumberOfTeams;
// Index
router.get('/', (request, response)=>{
  response.redirect('/cohorts')
})
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

// CREATE

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



  // this code works, but does not give the correct result
  router.get("/view/:id", (request, response) => {
    const cohortId=request.params.id;
    const method=request.query.method;
    const quantity=parseInt(request.query.quantity)
    let error = null;
    let randomizedTeams = [];
    const number=quantity;


    console.log(method, quantity, cohortId);
    if (!method){
      {
          knex("cohorts")
            .where("id", request.params.id)
            .first()
            .then((cohort) => {
              if (!cohort) {
                response.send("No such cohort");
              } else {
                response.render("view", { cohort: cohort,
                  new_team: [],
                  quantity:'',
                  method:'' });
              }
            });
        };

    } else 
    

    
    {
      knex
      .select("*")
      .from("cohorts")
      .where({ id: cohortId })
      .then(results => {
        console.log(results);
        const [cohort]=results;
        let members=cohort.members;
        let members_arr=(cohort.members).split(',').map(member=>member.trim());

        console.log(members_arr.length)
        if (quantity>members_arr.length){
          response.render('home')
          error = 'number of teams must be between 1 and number of members'
        } else {
        function shuffleArray(members_arr){
          for (let i=members_arr.length-1; i>0; i--){
            let j=Math.floor(Math.random()*(i+1));
            let temp=members_arr[i];
            members_arr[i]=members_arr[j];
            members_arr[j]=temp;
          }
          return members_arr;
        }
        members_arr=shuffleArray(members_arr);
        let new_team =[];
        if (method==='per_team'){
          randomizedTeams = randomizeTeams(members, number)

          while(members_arr.length){new_team.push(members_arr.splice(0, quantity))}
        } else {          randomizedTeams = NumberOfTeams(members, number)

          let new_length=(members_arr.length/quantity)
        while(members_arr.length>0&&new_length<=members_arr.length){
          // console.log('new length', new_length);
          // console.log('array length', members_arr.length);
          // console.log(new_length<=members_arr.length);
          new_team.push(members_arr.splice(0, new_length));
          new_length=Math.ceil((members_arr.length/quantity))
        }
        }
// console.log(new_team);
response.render('view', {
  cohort:cohort||{},
  new_team: new_team||[],
  quantity:quantity,
  method:method,
  members: randomizedTeams,
  number:number
})
    }})}
  })  

  //   // this code works, but does not give the correct result
  //   router.get("/view/:id", (request, response) => {
  //     const cohortId=request.params.id;
  //     const method=request.query.method;
  //     const quantity=parseInt(request.query.quantity)
  //     console.log(method, quantity, cohortId);
  //     if (!method){
  //       {
  //           knex("cohorts")
  //             .where("id", request.params.id)
  //             .first()
  //             .then((cohort) => {
  //               if (!cohort) {
  //                 response.send("No such cohort");
  //               } else {
  //                 response.render("view", { cohort: cohort,
  //                   new_team: [],
  //                   quantity:'',
  //                   method:'' });
  //               }
  //             });
  //         };
  
  //     } else {
  //       knex
  //       .select("*")
  //       .from("cohorts")
  //       .where({ id: cohortId })
  //       .then(results => {
  //         console.log(results);
  //         const [cohort]=results;
  //         let members_arr=(cohort.members).split(',').map(member=>member.trim());
  //         function shuffleArray(members_arr){
  //           for (let i=members_arr.length-1; i>0; i--){
  //             let j=Math.floor(Math.random()*(i+1));
  //             let temp=members_arr[i];
  //             members_arr[i]=members_arr[j];
  //             members_arr[j]=temp;
  //           }
  //           return members_arr;
  //         }
  //         members_arr=shuffleArray(members_arr);
  //         let new_team =[];
  //         if (method==='per_team'){
  //           while(members_arr.length){new_team.push(members_arr.splice(0, quantity))}
  //         } else {
  //           let new_length=(members_arr.length/quantity)
  //         while(members_arr.length>0&&new_length<=members_arr.length){
  //           // console.log('new length', new_length);
  //           // console.log('array length', members_arr.length);
  //           // console.log(new_length<=members_arr.length);
  //           new_team.push(members_arr.splice(0, new_length));
  //           new_length=Math.ceil((members_arr.length/quantity))
  //         }
  //         }
  // // console.log(new_team);
  // response.render('view', {
  //   cohort:cohort||{},
  //   new_team: new_team||[],
  //   quantity:quantity,
  //   method:method
  // })
  // })}
  //   })  
  // the code below works, above is experimental
// router.get("/view/:id", (request, response) => {
//   knex("cohorts")
//     .where("id", request.params.id)
//     .first()
//     .then((cohort) => {
//       if (!cohort) {
//         response.send("No such cohort");
//       } else {
//         response.render("view", { cohort: cohort });
//       }
//     });
// });

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