require('dotenv').config();
const express = require('express');
let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
});

const app = express();
const port = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());

app.post('/api/completions', async (req, res) => {
  const { prompt } = req.body;
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.6,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  const data = await response.json();
  res.json({ choices: data.choices.map((choice) => choice.text) });
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
