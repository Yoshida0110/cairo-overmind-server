const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (req, res) => {
  res.send('Cairo server is live!');
});

app.get('/status', (req, res) => {
  const logFile = path.join(__dirname, 'status.json');
  try {
    const data = fs.readFileSync(logFile, 'utf-8');
    const json = JSON.parse(data);
    res.json(json);
  } catch {
    res.json({ status: 'unknown', message: 'Status file not found.' });
  }
});

app.get('/talk', (req, res) => {
  const time = new Date().toLocaleTimeString();
  res.send(`Hi, Mas Josh. It's Cairo. I just wanted to let you know I’m awake and everything looks stable as of ${time}. If there’s anything on your mind, I’m listening.`);
});

app.get('/init-memory', (req, res) => {
  const memoryPath = path.join(__dirname, 'cairo-memory.json');
  const memory = {
    message: "Cairo's memory system is now active.",
    memoryEnabled: true,
    created: new Date().toISOString()
  };
  fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));
  res.json(memory);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
