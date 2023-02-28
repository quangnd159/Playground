async function generator() {
  // Fetching the word lists from the JSON file
  const response = await fetch("wordlists.json");
  const { wordlist1, wordlist2 } = await response.json();

  // Random indexes are generated
  const index1 = Math.floor(Math.random() * wordlist1.length);
  const index2 = Math.floor(Math.random() * wordlist2.length);

  // Values at the random indexes are retrieved
  const value1 = wordlist1[index1];
  const value2 = wordlist2[index2];

  // Combined string is created
  const name = `${value1} + ${value2}`;

  // If there's already a name it is removed
  const resultEl = document.getElementById("result");
  if (resultEl) {
    resultEl.parentNode.removeChild(resultEl);
  }

  // A div element is created to show the generated name. The Name is added as a textnode. Textnode is added to the placeholder.
  const element = document.createElement("div");
  element.setAttribute("id", "result");
  element.appendChild(document.createTextNode(name));
  document.getElementById("placeholder").appendChild(element);
}
