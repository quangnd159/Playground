const mysteryBox = document.getElementById("mystery-box");
const questionMark = document.getElementById("question-mark");
const resetButton = document.getElementById("reset-button");

const items = [-500, -400, -300, -200, -100, 100, 200, 300, 400, 500, 1000, "💩", "🔄"];

mysteryBox.addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * items.length);
  questionMark.innerHTML = items[randomIndex];
});

resetButton.addEventListener("click", function () {
  questionMark.innerHTML = "?";
});
