const Randomizer = require('../randomize.js');
const randomizeTeams = Randomizer.RandomizeTeams;
const NumberOfTeams = Randomizer.NumberOfTeams;

const Express = require('express');
const router = Express.Router();




router.get('/', function(req, res, next) {
    res.render('index', {
        names: '',
        number: '',
        error: null
    });
})

router.post('/index', function(req, res, next) {
    // the req.body is the form data received from the submitted form
    // it's been added to req by the body-parser middleware
    let error = null;
    let randomizedTeams = [];
    const {
        names,
        number,
        method
    } = req.body
    console.log(req.body);
    res.cookie('names', req.body.names, {
        maxAge: 3000000
    });


    if (number > names.split(",").length) {
        error = "Number of teams must be between 1 and the number of members"
    } else {
        if (method === "per_team") {
            randomizedTeams = randomizeTeams(names, number)
        } else {
            randomizedTeams = NumberOfTeams(names, number)
        }
    }
    // res.send(req.body);
    // (NEW!) Shortcut Object creation syntax
    // { params } creates an object with a property named params and a value equal
    // to params (i.e. { params: params })

    res.render('index', {
        names: randomizedTeams,
        method: req.body.method,
        number: req.body.number,
        error: error
    });
    // passing an object as a second argument to render will make all properties
    // of that object available as variables inside the template
})

// when this file will be required somewhere else, it will receive the
// value on the right-hand side of module.exports
// in this case, that would be the router object we're creating
module.exports = router;
