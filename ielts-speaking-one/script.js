const time = {
  easy: 30,
  hard: 20
}

let due = 0;
let interval = null;
let currentMode = 'random';

async function getQuestions() {
  const response = await fetch('questions.json');
  const questions = await response.json();
  return questions;
}

const runCountDown = (time) => {
  if (interval) {
    clearInterval(interval);
  }

  document.getElementById('counter').innerHTML = due;

  interval = setInterval(() => {
    due -= 1;
    document.getElementById('counter').innerHTML = due;
    if (due === 0) {
      generator();
    }
  }, 1000);
};

async function generator(type = currentMode) {
  const questions = await getQuestions();

  const randomNumber = Math.floor(Math.random() * questions.length);
  const question = questions[randomNumber];

  currentMode = type;

  if (time[type]) {
    due = time[type];
    runCountDown(due);
  } else {
    clearInterval(interval);
    document.getElementById('counter').innerHTML = '';
  }

  document.getElementById('question-display').innerHTML = question;
}

const stop = () => {
  clearInterval(interval);
};
