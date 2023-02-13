const generateButton = document.getElementById('generate-button');
const namesInput = document.getElementById('names-input');
const numTeamsSelect = document.getElementById('num-teams');
const teamsContainer = document.querySelector(".teams-container");

generateButton.addEventListener('click', function () {
  const names = namesInput.value.split('\n');
  const numTeams = parseInt(numTeamsSelect.value);

  let teamNames = [];
  fetch('team-names.json')
    .then(response => response.json())
    .then(data => {
      teamNames = shuffleArray(data);
      const teams = generateTeams(names, numTeams);
      displayTeams(teams, teamNames);
    });
});

function generateTeams(names, numTeams) {
  const teams = [];
  for (let i = 0; i < numTeams; i++) {
    teams.push([]);
  }

  names = shuffleArray(names);
  for (let i = 0; i < names.length; i++) {
    teams[i % numTeams].push(names[i]);
  }

  return teams;
}

function displayTeams(teams, teamNames) {
  teamsContainer.innerHTML = '';
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const teamName = teamNames[i % teamNames.length];
    const teamContainer = document.createElement('div');
    teamContainer.innerHTML = `<h3>${teamName}</h3><ul>`;
    for (const member of team) {
      teamContainer.innerHTML += `<li>${member}</li>`;
    }
    teamContainer.innerHTML += '</ul>';
    teamsContainer.appendChild(teamContainer);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
