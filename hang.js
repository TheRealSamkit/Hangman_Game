import { categories, audioList } from "./constant.js";
import { con_animation, key_animation, hang_animation, pop_up_animation, bounce_effect, wrong_effect } from "./animation.js";
import { fetchRandomWordAndHint } from "./api.js";

let getbutton = true;
let music = false;
let sound = false;
let currentCategory = {};
let randWord = "";
let previousGuess = "";
let hint = "";
let difficulty = "";
let correctGuesses = 0;
let falseGuess = 0;
let pickedWord = [];
let category = ["animals", "birds", "indian", "fruits", "vegetables"]
let { click, start, bg, shabash, wrong, over, correct } = audioList;
const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");

const overlay = document.getElementById('overlay');
const selectorElement = document.getElementById("selector");
const containerElement = document.getElementById("container");
const keyboardElement = document.getElementById("keyboard");
const blankElement = document.getElementById("blank");
const messageElement = document.getElementById("message");
const popupElement = document.getElementById("popup");
const outputElement = document.getElementById("output");
const hangmanCanvas = document.getElementById("hangMan");
const playAgainButton = document.getElementById("playAgain");
const musicElement = document.getElementById("music");
const hintButton = document.getElementById("hint-btn");
const closeHintButton = document.getElementById("close-hint");
const stopSoundsButton = document.getElementById("stopSounds");
const diffbtn = document.querySelectorAll(".ms");
const diff = document.querySelector(".diff");
const ctx = hangmanCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  selectorElement.addEventListener("click", () => {
    selectorElement.style.display = "none";
    h1.classList.remove("hide");
    diffbtn.forEach(element => {
      element.classList.remove("hide");
    });
    start.currentTime = 0.8;
    start.play();
    bg.play();
  });

  hintButton.addEventListener("click", opnHint);
  diffbtn.forEach((button) => button.addEventListener("click", (event) => startGame(event.target.dataset.mode)));
  closeHintButton.addEventListener("click", clsHint);
  playAgainButton.addEventListener("click", resetGame);
  musicElement.addEventListener("click", toggleAnimation);
  stopSoundsButton.addEventListener("click", stopAllSounds);
  soundsStarted();
});

const soundsStarted = () => {
  start.volume = 0.050;

  bg.volume = 0.050;
  bg.loop = true;

  correct.volume = 0.4;

  wrong.volume = 0.2;

  click.volume = 0.7;

  shabash.volume = 0.5;

  over.volume = 0.5;

  music = true;
  sound = true;
};

const startGame = (mode) => {
  diff.classList.add("hide");
  containerElement.style.display = "flex";
  console.log(mode)
  difficulty = mode;
  click.currentTime = 0.153;
  click.play();
  initializeKeyboard();
  wordPicker();

  con_animation();
  bounce_effect();
};

const wordPicker = async () => {
  if (difficulty === "easy") {
    currentCategory = categories[category[rand(category.length)]];
    const idx = rand(currentCategory.words.length);
    randWord = currentCategory.words[idx];
    hint = currentCategory.hints[idx];
    if (pickedWord.includes(randWord)) wordPicker();
    if (pickedWord.length === 85) pickedWord = [];
    pickedWord.unshift(randWord);
  } else {
    try {
      overlay.style.display = 'flex';

      const { randomWord, hint: apiHint } = await fetchRandomWordAndHint();
      randWord = randomWord.toLowerCase();
      hint = apiHint;

    } catch (error) {

      console.error("Error fetching random word and hint:", error);
      randWord = "default";
      hint = "No hint available";

    } finally {
      overlay.style.display = 'none'; // Hide loader
    }
  }
  if (hint.includes(randWord) || hint.includes(
    randWord[0].toUpperCase() +
    randWord.slice(1))) {
    hint = extractRelevantHint(hint, 149);
    hint = hint.replace(new RegExp(`\\b${randWord}\\b`, 'gi'), '[hidden]');
  }

  if (hint.includes(':')) {
    hint = removeTextBeforeColon(hint);
  }

  wordToGuess();
};

const extractRelevantHint = (text, maxLength = 150) => {
  const sentences = text.split('.').filter(sentence => sentence.trim().length > 0);
  let hint = sentences[0].trim() + '.'; // Start with the first sentence

  if (sentences.length > 1) {
    const secondSentence = sentences[1].trim() + '.'; // Include the second sentence

    // Check if the combined length of both sentences is within maxLength
    if ((hint + ' ' + secondSentence).length <= maxLength) {
      hint += ' ' + secondSentence; // Include the second sentence fully
    }
  }

  // If the first sentence alone exceeds the maxLength, truncate it
  if (hint.length > maxLength) {
    hint = hint.slice(0, maxLength).trim() + '...';
  }

  return hint;
};

const removeTextBeforeColon = (text) => {
  const parts = text.split(':');
  if (parts.length > 1 && parts[1].trim().length > 0) {
    if (text.length < 1) {
      return text = "No hint available";
    }
    return parts.slice(1).join(':').trim();
  }
};

const rand = (len) => {
  const now = Date.now();
  return Math.floor(now * Math.random()) % len;
};

const initializeKeyboard = () => {
  if (getbutton) {
    const letters = document.createElement("ul");
    letters.id = "alphabet";
    alphabets.forEach((letter) => {
      const button = document.createElement("button");
      button.id = `letter-${letter}`;
      button.innerHTML = letter.toUpperCase();
      button.className = "letter";
      button.value = letter;
      button.onclick = () => handleGuess(letter, button);
      letters.appendChild(button);

    });

    keyboardElement.appendChild(letters);
    getbutton = false;
    key_animation();
  }
}

const wordToGuess = () => {
  blankElement.innerHTML = "";
  const correct = document.createElement("ul");
  correct.id = "my-word";

  randWord.split("").forEach((char, i) => {
    const guess = document.createElement("li");
    guess.className = "guess";
    guess.innerHTML = char === "-" ? "-" : "_";
    correct.appendChild(guess);
  });

  correctGuesses = 0;
  blankElement.appendChild(correct);
};

const handleGuess = (guess, element) => {
  if (previousGuess !== guess) {
    let guessedCorrectly = false;
    click.currentTime = 0.153;
    click.play();
    randWord.split("").forEach((char, i) => {
      if (char === guess) {
        document.querySelectorAll(".guess")[i].innerHTML = guess.toUpperCase();
        element.innerHTML = `${guess.toUpperCase()}<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" class="mark" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>`;
        correctGuesses += 1;
        guessedCorrectly = true;
        over.currentTime = 1;
        correct.currentTime = 0.155;
        correct.play();
      }
    });

    if (!guessedCorrectly) wrongGuess(element, guess);
  }

  element.disabled = true;
  element.classList.add("active");
  previousGuess = guess;

  if (correctGuesses === randWord.replace(/[^a-zA-Z]/g, "").length) {
    messageElement.innerHTML = "Congratulations! You've won!";
    disableAllButtons();
    confettiAnimation();
    shabash.play();
  }
};

const disableAllButtons = () => {
  alphabets.forEach((letter) => {
    document.getElementById(`letter-${letter}`).disabled = true;
  });
};

const opnHint = () => {
  popupElement.style.display = "flex";
  outputElement.innerText = hint;
  click.currentTime = 0.153;
  click.play();
  pop_up_animation();
};

const clsHint = () => {
  popupElement.style.display = "none";
  click.currentTime = 0.153;
  click.play();
};

const stopAllSounds = () => {
  if (sound) {
    click.currentTime = 0.153;
    click.play();
    for (const key in audioList) {
      if (audioList.hasOwnProperty(key)) {
        const audio = audioList[key];
        if (audio !== bg) {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0;
          audio.loop = false;
        }
      }
    }
    stopSoundsButton.innerHTML = '<i class="fa-solid fa-volume-xmark -sound"></i>';
    sound = false;
  } else {
    stopSoundsButton.innerHTML = '<i class="fa-solid fa-volume-high -sound"></i>';
    soundsStarted();
    click.currentTime = 0.153;
    click.play();
    sound = true;
  }
};

const toggleAnimation = () => {
  if (music) {
    musicElement.style.animation = "none";
    musicElement.classList.add("-music2");
    music = false;
    bg.pause();
    click.currentTime = 0.153;
    click.play();
  } else {
    musicElement.style.animation = "rotate 2s linear infinite";
    musicElement.classList.remove("-music2");
    bg.loop = true;
    music = true;
    bg.play();
    click.currentTime = 0.153;
    click.play();
  }
};

const draw = () => {
  const ctx = hangmanCanvas.getContext("2d");
  ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";

  if (falseGuess > 0) {
    ctx.moveTo(15, 140);
    ctx.lineTo(150, 140);
    ctx.stroke();
    ctx.clearRect(0, 0, 150, 138);
  }
  if (falseGuess > 1) {
    ctx.moveTo(20, 20);
    ctx.lineTo(20, 140);
    ctx.moveTo(20, 50);
    ctx.lineTo(50, 30);
    ctx.stroke();
    ctx.clearRect(60, 40, 110, 90);
  }
  if (falseGuess > 2) {
    ctx.moveTo(10, 30);
    ctx.lineTo(100, 30);
    ctx.stroke();
    ctx.clearRect(60, 40, 110, 90);
  }
  if (falseGuess > 3) {
    ctx.beginPath();
    ctx.arc(90, 30, 2, 0, 2 * Math.PI);
    ctx.moveTo(90, 30);
    ctx.lineTo(90, 70);
    ctx.stroke();
    ctx.clearRect(60, 69, 90, 70.03);
  }
  if (falseGuess > 4) {
    ctx.clearRect(60, 69, 90, 70.03);
    ctx.beginPath();
    ctx.arc(90, 77, 7, 0, 2 * Math.PI);
    ctx.stroke();
  }
  if (falseGuess > 5) {
    ctx.moveTo(90, 83);
    ctx.lineTo(90, 110);
    ctx.stroke();
  }
  if (falseGuess > 6) {
    ctx.moveTo(90, 87);
    ctx.lineTo(80, 105);
    ctx.moveTo(90, 87);
    ctx.lineTo(100, 105);
    ctx.stroke();
  }
  if (falseGuess > 7) {
    ctx.moveTo(90, 110);
    ctx.lineTo(80, 125);
    ctx.moveTo(90, 110);
    ctx.lineTo(100, 125);
    ctx.stroke();
  }

  if (falseGuess >= 8) {
    document.getElementById("message").innerHTML =
      "Game Over! The correct word was " +
      randWord[0].toUpperCase() +
      randWord.slice(1);
    over.currentTime = 1;
    over.play();
    alphabets.forEach((letter) => {
      document.getElementById(`letter-${letter}`).disabled = true;
    });
  }
};

const wrongGuess = (element, guess) => {
  element.classList.add("wrong");
  element.innerHTML = `${guess.toUpperCase()}<svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" class="mark" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>
`
  wrong.currentTime = 2;
  falseGuess += 1;
  hang_animation();
  wrong_effect();
  wrong.play();
  draw();
  setTimeout(() => {
    element.classList.remove("wrong");
  }, 1000);
};
const resetGame = () => {
  ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
  correctGuesses = 0;
  falseGuess = 0;
  previousGuess = "";
  messageElement.innerHTML = "";
  getbutton = true;
  keyboardElement.innerHTML = "";
  wordPicker();
  initializeKeyboard();
  click.currentTime = 0.153;
  click.play();
};

const confettiAnimation = () => {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    const createConfetti = (x) =>
      confetti({
        ...defaults,
        particleCount,
        origin: { x, y: Math.random() - 0.2 },
      });
    createConfetti(0.2);
    createConfetti(0.8);
  }, 250);
};

