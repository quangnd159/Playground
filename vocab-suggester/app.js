const btn = document.getElementById("btn");
const addBtn = document.getElementById("add-btn");
const suggestBtn = document.getElementById("suggest-btn");
const clearBtn = document.getElementById("clear-btn");
const question = document.getElementById("question");
const vocabulary = document.getElementById("vocabulary");
const input = document.getElementById("input");
const apiKey = document.getElementById("apiKey");
const loadingIcon = document.getElementById("loading-icon");
let questions = [];

fetch("questions.json")
  .then(response => response.json())
  .then(data => {
    questions = data;
  });

addBtn.addEventListener("click", function () {
  const customQuestions = input.value.split("\n");
  questions = [...questions, ...customQuestions];
  input.value = "";
});

btn.addEventListener("click", function () {
  const randomIndex = Math.floor(Math.random() * questions.length);
  question.innerHTML = questions[randomIndex];
});

suggestBtn.addEventListener("click", function () {
  const key = apiKey.value;

  localStorage.setItem("openai_api_key", key);

  loadingIcon.style.display = "block";
  vocabulary.innerHTML = "";

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `Suggest relevant words or phrases to help IELTS candidates answer the speaking question in bullet points. The vocabulary must be natural, conversational English used in daily life: ${question.innerHTML}`,
      temperature: 0.7,
      max_tokens: 30,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
    .then(response => response.json())
    .then(data => {
      loadingIcon.style.display = "none";
      vocabulary.innerHTML = data.choices[0].text;
    });

});

clearBtn.addEventListener("click", function () {
  questions = [];
  input.value = "";
});

document.addEventListener("DOMContentLoaded", function () {
  const savedKey = localStorage.getItem("openai_api_key");
  if (savedKey) {
    apiKey.value = savedKey;
  }
});
