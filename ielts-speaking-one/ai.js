const apiKey = document.querySelector("input[type='text']");
const question = document.querySelector("#question-display");
const counter = document.querySelector("#counter");
const loadingIcon = document.getElementById("loading-icon");

document.querySelector("#get-ai-response").addEventListener("click", function () {
  const key = apiKey.value;
  localStorage.setItem("openai_api_key", key);

  loadingIcon.style.display = "block";

  const aiResponse = document.createElement("div");
  aiResponse.id = "ai-response";

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        "role": "user", "content": `Answer this IELTS Speaking Part 1 questions in 3-4 sentences using natural, conversational English. Do not mirror the question words when answering a yes-no question: ${question.innerHTML}.`
      }],
      temperature: 0.6,
      max_tokens: 100,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const aiResponseContainer = document.createElement("div");
      aiResponseContainer.classList.add("ai-response-container");
      const aiResponse = document.createElement("div");
      loadingIcon.style.display = "none";
      aiResponse.innerHTML = data.choices[0].message.content;
      aiResponse.id = "ai-response";
      aiResponseContainer.appendChild(aiResponse);
      question.appendChild(aiResponseContainer);
    })
    .catch(err => {
      console.error(err);
      counter.innerHTML = "Error: Could not generate AI response.";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const savedKey = localStorage.getItem("openai_api_key");
  if (savedKey) {
    apiKey.value = savedKey;
  }
});