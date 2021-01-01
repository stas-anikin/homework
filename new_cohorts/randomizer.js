const RandomizeTeams = function (names, teamCount) {
  names = names.split(",");
  shuffle(names);
  let randomTeams = [];
  // while we have enough people to make a full team
  while (names.length >= teamCount) {
    let team = [];
    // creating a team
    for (let i = 0; i < teamCount; i++) {
      if (names.length <= 0) {
        break;
      }
      team.push(names.pop());
    }
    randomTeams.push(team);
  }

  // distributing extras among already made teams
  for (let i = 0; i < randomTeams.length; i++) {
    if (names.length <= 0) {
      break;
    }
    randomTeams[i].push(names.pop());
  }
  return randomTeams;
};

// based on number of teams
const NumberOfTeams = function (names, number) {
  names = names.split(",");
  console.log(names);
  console.log(number);
  shuffle(names);
  let teams = [];
  for (let i = 0; i < number; i++) {
    teams[i] = [];
  }
  while (names.length > 0) {
    for (let i = 0; i < number; i++) {
      teams[i].push(names.shift());
      if (names.length === 0) {
        break;
      }
    }
  }
  console.log(teams);
  return teams;
};

//Shuffle names
function shuffle(a) {
  let j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

module.exports = {
  RandomizeTeams: RandomizeTeams,
  NumberOfTeams: NumberOfTeams,
};
