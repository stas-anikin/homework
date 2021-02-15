const wordEl = document.getElementById("word");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const gallows = document.getElementById("gallows");
const allLeters = document.querySelectorAll(".letter.button");
const failSound = () => new Audio("assets/sounds/fail.wav");
const winSound = () => new Audio("assets/sounds/win.wav");

const teams = [
  "ducks",
  "bruins",
  "sabres",
  "flames",
  "hurricanes",
  "knights",
  "blackhawks",
  "avalanche",
  "jackets",
  "stars",
  "wings",
  "oilers",
  "panthers",
  "kings",
  "wild",
  "canadiens",
  "predators",
  "devils",
  "islanders",
  "rangers",
  "senators",
  "flyers",
  "coyotes",
  "penguins",
  "blues",
  "sharks",
  "lighting",
  "leafs",
  "canucks",
  "capitals",
  "jets",
];

let team = teams[Math.floor(Math.random() * teams.length)];

const correctLetters = [];
const wrongLetters = [];

// we're taking the name of the team (word), splitting it and getting all the correct letters from it and then turning it back into a string
function set_word() {
  wordEl.innerHTML = `
        ${team
          .split("")
          .map(
            (letter) => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ""}
            </span>
            `
          )
          .join("")}`;

  const innerWord = wordEl.innerText.replace(/\n/g, "");
  // win condition
  if (innerWord === team) {
    finalMessage.innerText = "Congratulations! You win!";
    popup.style.display = "flex";
    winSound().play();
  }
}

// update wrongLetters and gallows images
function updateGallows() {
  if (wrongLetters.length <= 6) {
    gallows.setAttribute("src", `assets/images/hang${wrongLetters.length}.jpg`);
  }
  // make sure the cycle stops at the final image
  else {
    gallows.setAttribute("src", `assets/images/hang6.jpg`);
  }
  //check if lost
  if (wrongLetters.length === 6) {
    finalMessage.innerText = "Better luck next time...";
    popup.style.display = "flex";
    failSound().play();
  }
}

// keyboard functionality
window.addEventListener("keydown", (e) => {
  if ((e.keyCode >= 65) & (e.keyCode <= 90)) {
    const letter = e.key;
    // if the letter is in the word
    if (team.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        // deactivate the letter and turn it green
        document.querySelector(`#${letter}`).classList.add("valid-letter");
        set_word();
      }
      // if the letter is not in the word
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        // deactivate the letter and turn it red
        document.querySelector(`#${letter}`).classList.add("wrong-letter");
        // this will change the image wrong letters container
        updateGallows();
      }
    }
  }
});

// adding button functionality
allLeters.forEach((element) => {
  element.addEventListener("click", (event) => {
    const letter = element.id;
    console.log(letter);

    if (team.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        document.querySelector(`#${letter}`).classList.add("valid-letter");
        set_word();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        document.querySelector(`#${letter}`).classList.add("wrong-letter");
        updateGallows();
      }
    }
  });
});
// restart game and play again
playAgainBtn.addEventListener("click", () => {
  //empty the correct and wrong letter arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  // set the new word to guess
  team = teams[Math.floor(Math.random() * teams.length)];
  set_word();
  // reset buttons styling and wrong letters
  updateGallows();
  allLeters.forEach((letter) =>
    letter.classList.remove("wrong-letter", "valid-letter")
  );
  popup.style.display = "none";
});

set_word();
