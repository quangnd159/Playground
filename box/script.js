const mysteryBox = document.getElementById("mystery-box");
const questionMark = document.getElementById("question-mark");
const resetButton = document.getElementById("reset-button");

const items = [-500, -400, -300, -200, -100, 100, 200, 300, 400, 500, 1000, "💩", "🔄"];

mysteryBox.addEventListener("click", function () {
  mysteryBox.classList.remove("unopened");
  mysteryBox.classList.add("opened");
  questionMark.classList.remove("unopened");
  questionMark.classList.add("opened");

  const randomIndex = Math.floor(Math.random() * items.length);
  questionMark.innerHTML = items[randomIndex];
});


resetButton.addEventListener("click", function () {
  questionMark.innerHTML = "?";
  mysteryBox.classList.remove("opened");
  mysteryBox.classList.add("unopened");
  questionMark.classList.remove("opened");
  questionMark.classList.add("unopened");
});
