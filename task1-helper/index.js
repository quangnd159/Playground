const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OPENAI_API_KEY = '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';

app.post('/api/get-help', async (req, res) => {
  const { input } = req.body;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`
  };

  const data = {
    "model": "text-davinci-002",
    "prompt": `${input}\n\nHelp me with this:`,
    "temperature": 0.5,
    "max_tokens": 200,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
    const helpText = response.data.choices[0].text;
    res.json({ helpText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
