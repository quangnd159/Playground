const submitBtn = document.getElementById("submitBtn");
const inputText = document.getElementById("inputText");
const apiKey = document.getElementById("apiKey");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

const container = document.querySelector('.container');

submitBtn.addEventListener("click", function () {
  const text = inputText.value;
  const key = apiKey.value;

  localStorage.setItem("openai_api_key", key);

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": `Correct only the grammar of this text:\n\n${text}` }],
      temperature: 0,
      max_tokens: 200,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
    .then(response => response.json())
    .then(data => {
      const correctedText = data.choices[0].message.content;

      const diff = Diff.diffWords(text, correctedText);

      let outputHTML = "";
      diff.forEach(function (part) {
        if (part.added) {
          outputHTML += "<span style='background-color: lightgreen'>" + part.value + "</span>";
        } else if (part.removed) {
          outputHTML += "<span style='background-color: lightcoral'>" + part.value + "</span>";
        } else {
          outputHTML += part.value;
        }
      });

      const outputContainer = document.createElement("div"); // create new container
      outputContainer.setAttribute("id", "output-container");

      const output = document.createElement("div");
      output.setAttribute("id", "output");
      output.innerHTML = outputHTML;

      const copyBtn = document.createElement("button");
      copyBtn.textContent = "Copy Feedback";
      copyBtn.addEventListener("click", function () {
        copyBtn.style.display = "none";
        const range = document.createRange();
        range.selectNode(output);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
      });

      const copyCorrectedBtn = document.createElement("button"); // create new button
      copyCorrectedBtn.textContent = "Copy Only Corrected Text"; // set text content
      copyCorrectedBtn.addEventListener("click", function () { // add click event listener
        navigator.clipboard.writeText(correctedText);
        copyCorrectedBtn.remove(); // remove the button from the DOM
      });


      outputContainer.appendChild(output); // append output and copyBtn to the new container
      outputContainer.appendChild(copyBtn);
      outputContainer.appendChild(copyCorrectedBtn);

      const oldOutputContainer = document.getElementById("output-container"); // check if there is an old container
      if (oldOutputContainer) {
        oldOutputContainer.replaceWith(outputContainer); // replace the old container with the new one
      } else {
        container.appendChild(outputContainer); // if there is no old container, just append the new container to the main container
      }

      copyBtn.setAttribute("id", "copyBtn");
      copyCorrectedBtn.setAttribute("id", "copyCorrectedBtn")
    })
    .catch(error => console.error(error));
});

document.addEventListener("DOMContentLoaded", function () {
  const savedKey = localStorage.getItem("openai_api_key");
  if (savedKey) {
    apiKey.value = savedKey;
  }
});
