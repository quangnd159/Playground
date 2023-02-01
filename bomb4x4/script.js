window.onload = function () {
  const grid = document.querySelector("#grid");
  const values = ["💎", "💎", "💎", "💎", "💎", "♥️", "♥️", "♥️", "⭐", "⭐", "⭐", "💣", "💩", "💩", "🔄", "🔄"];

  // shuffle the values
  values.sort(() => Math.random() - 0.5);

  // generate the column labels
  for (let i = 0; i < 4; i++) {
    const colLabel = document.createElement("div");
    colLabel.classList.add("grid-label");
    colLabel.textContent = (i + 1).toString();
    colLabel.style.gridRowStart = "1";
    colLabel.style.gridColumnStart = (i + 2).toString();
    grid.appendChild(colLabel);
  }

  // generate the row labels
  let count = 1;
  for (let i = 0; i < 4; i++) {
    const rowLabel = document.createElement("div");
    rowLabel.classList.add("grid-label");
    rowLabel.textContent = String.fromCharCode(65 + i);
    rowLabel.style.gridRowStart = (i + 2).toString();
    rowLabel.style.gridColumnStart = "1";
    grid.appendChild(rowLabel);

    for (let j = 0; j < 4; j++) {
      const square = document.createElement("div");
      square.classList.add("square");

      const value = document.createElement("span");
      value.textContent = values[(i * 4) + j];
      square.appendChild(value);

      square.addEventListener("click", () => {
        square.style.backgroundColor = "#DFFFE9";
        square.querySelector("span").style.visibility = "visible";
      });
      square.style.gridRowStart = (i + 2).toString();
      square.style.gridColumnStart = (j + 2).toString();
      grid.appendChild(square);
    }
  }
};
