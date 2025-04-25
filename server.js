
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 10000;

let memory = [];

app.use(bodyParser.json());

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, Mas Josh. Cairo is awake and listening.');
});

// Initialize memory
app.get('/init-memory', (req, res) => {
  res.json({
    message: "Cairo's memory system is now active.",
    memoryEnabled: true,
    created: new Date().toISOString()
  });
});

// Save memory
app.post('/memory', (req, res) => {
  const { memory: memoryInput } = req.body;
  if (!memoryInput) {
    return res.status(400).json({ error: 'Memory content is required.' });
  }
  memory.push({ content: memoryInput, savedAt: new Date().toISOString() });
  res.json({ message: 'Memory saved successfully.' });
});

// Retrieve memory
app.get('/memory', (req, res) => {
  res.json(memory);
});

// Start server
app.listen(port, () => {
  console.log(`Cairo server is live on port ${port}`);
});
