// Get the elements we'll be working with
const apiKeyInput = document.querySelector("input[type='text']");
const userRequest = document.getElementById("userRequest");
const getHelpBtn = document.getElementById("getHelpBtn");
const helpList = document.getElementById("helpList");
const loadingIcon = document.getElementById("loading-icon");

// Try to load the API key from local storage
let key = process.env.OPENAI_API_KEY;


// Set up an event listener for the button
getHelpBtn.addEventListener("click", async () => {
  // Get the user's request
  const request = userRequest.value.trim();

  // Make sure the user entered something
  if (request.length === 0) {
    alert("Please enter a request.");
    return;
  }

  // Make the API call
  try {
    loadingIcon.style.display = "block";

    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Use the chart/graph language typically found in The Economist reports to write three variations of sentence to ${request}. Wrap the whole thing in <ol></ol> and wrap each sentence in <li></li>.`,
        temperature: 0.6,
        max_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });

    const data = await response.json();

    // Clear the previous results, if any
    helpList.innerHTML = "";

    // Display the results as plain text
    helpList.innerHTML = data.choices.map(choice => choice.text).join("<br>");

    loadingIcon.style.display = "none";
  } catch (error) {
    console.error(error);
    alert("There was an error. Please try again later.");
    loadingIcon.style.display = "none";
  }
});

// Set up an event listener for the input field
userRequest.addEventListener("keyup", (event) => {
  // If the user hits enter, simulate a button click
  if (event.keyCode === 13) {
    getHelpBtn.click();
  }
});

// Set up an event listener for the API key input field
apiKeyInput.addEventListener("change", () => {
  // Save the API key to local storage
  key = apiKeyInput.value.trim();
  localStorage.setItem("openai_api_key", key);
});

document.addEventListener("DOMContentLoaded", function () {
  if (key !== "") {
    apiKeyInput.value = key;
  }
});
