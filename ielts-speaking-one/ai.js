const apiKey = document.querySelector("input[type='text']");
const question = document.querySelector("#question-display");
const counter = document.querySelector("#counter");

document.querySelector("#get-ai-response").addEventListener("click", function () {
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
      prompt: `Answer this IELTS Speaking Part 1 questions in 3-4 sentences using natural, conversational English. Do not mirror the question words when answering a yes-no question: ${question.innerHTML}`,
      temperature: 0.7,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const aiResponse = document.createElement("div");
      aiResponse.innerHTML = data.choices[0].text;
      aiResponse.id = "ai-response";
      question.appendChild(aiResponse);
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