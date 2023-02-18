const userRequest = document.getElementById("userRequest");
const getHelpBtn = document.getElementById("getHelpBtn");
const helpList = document.getElementById("helpList");
const loadingIcon = document.getElementById("loading-icon");

getHelpBtn.addEventListener("click", async () => {
  const request = userRequest.value.trim();

  if (request.length === 0) {
    alert("Please enter a request.");
    return;
  }

  try {
    loadingIcon.style.display = "block";

    const response = await fetch("/api/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Use the chart/graph language typically found in The Economist reports to write three variations of sentence to ${request}. Wrap the whole thing in <ol></ol> and wrap each sentence in <li></li>.`,
      }),
    });

    const data = await response.json();

    helpList.innerHTML = data.choices.join("<br>");
  } catch (error) {
    console.error(error);
    alert("There was an error. Please try again later.");
  } finally {
    loadingIcon.style.display = "none";
  }
});
