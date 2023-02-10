const submitBtn = document.getElementById("submitBtn");
const inputText = document.getElementById("inputText");
const apiKey = document.getElementById("apiKey");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

submitBtn.addEventListener("click", function () {
  const text = inputText.value;
  const key = apiKey.value;

  localStorage.setItem("openai_api_key", key);

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Correct this to standard English:\n\n${text}`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      // stream: true,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
    .then(response => response.json())
    .then(data => {
      const correctedText = data.choices[0].text;

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

      output.innerHTML = outputHTML;
      const copyBtn = document.createElement("button");
      copyBtn.textContent = "Copy";
      copyBtn.style.marginLeft = "10px";
      copyBtn.addEventListener("click", function () {
        copyBtn.style.display = "none";
        const range = document.createRange();
        range.selectNode(output);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
      });
      output.appendChild(copyBtn);
    })
    .catch(error => console.error(error));
});

document.addEventListener("DOMContentLoaded", function () {
  const savedKey = localStorage.getItem("openai_api_key");
  if (savedKey) {
    apiKey.value = savedKey;
  }
});
