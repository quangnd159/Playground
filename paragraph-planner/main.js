window.addEventListener('load', () => {
const list_el = document.querySelector("#ideas");
const add_topic = document.querySelector("#add-topic");
const add_supporting = document.querySelector("#add-supporting");
const add_effect = document.querySelector("#add-effect");
const add_reason = document.querySelector("#add-reason");
const add_example = document.querySelector("#add-example");
const add_comparison = document.querySelector("#add-comparison");
const add_addition = document.querySelector("#add-addition");
const saveButton = document.getElementById('save');
const loadButton = document.getElementById('load');

// ADD TOPIC

add_topic.addEventListener('click', (e) => {
  e.preventDefault();

  const download = document.querySelector("#download");
  download.classList.add("visible");

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "topic");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");
  idea_input_el.setAttribute("tabindex", 0);

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.prepend(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD SUPPORTING

add_supporting.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "supporting");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD EFFECT

add_effect.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "effect");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD REASON

add_reason.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "reason");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD EXAMPLE

add_example.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "example");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD COMPARISON

add_comparison.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "comparison");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

// ADD ADDITION

add_addition.addEventListener('click', (e) => {
  e.preventDefault();

  const idea = "";

  const idea_el = document.createElement("div");
  idea_el.classList.add("idea", "addition");

  const idea_content_el = document.createElement("div");
  idea_content_el.classList.add("content");

  idea_el.appendChild(idea_content_el);

  const idea_input_el = document.createElement("div");
  idea_input_el.classList.add("text");
  idea_input_el.setAttribute("contenteditable", "true");

  idea_content_el.appendChild(idea_input_el);

  const idea_actions_el = document.createElement("div");
  idea_actions_el.classList.add("actions");

  const idea_delete_el = document.createElement("button");
  idea_delete_el.setAttribute("data-html2canvas-ignore", "true");
  idea_delete_el.classList.add("delete");
  idea_delete_el.innerHTML = "X";

  idea_actions_el.appendChild(idea_delete_el);
  idea_delete_el.setAttribute("tabindex", -1);

  idea_el.appendChild(idea_actions_el);

  list_el.appendChild(idea_el);

  idea_delete_el.addEventListener('click', () => {
    list_el.removeChild(idea_el);
  });
});

new Sortable(list_el, {
  animation: 200
});
})