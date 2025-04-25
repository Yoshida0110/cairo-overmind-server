const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for memory uploader HTML page
app.get('/memory-uploader', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cairo Memory Uploader</title>
      <style>
        body { background-color: #0d0d2b; color: white; font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        textarea { width: 80%; height: 150px; font-size: 1em; margin-top: 20px; padding: 10px; border-radius: 6px; border: none; }
        button { margin-top: 20px; padding: 10px 20px; background-color: #008cff; color: white; border: none; border-radius: 6px; font-size: 1em; cursor: pointer; }
        h1 { margin-bottom: 0; }
      </style>
    </head>
    <body>
      <h1>Cairo’s First Memory</h1>
      <form method="POST" action="/memory">
        <textarea name="memory" placeholder="Type her origin memory here..."></textarea><br>
        <button type="submit">Send Memory</button>
      </form>
    </body>
    </html>
  `);
});

// Handle POST from the form
app.post('/memory', (req, res) => {
  const memoryData = {
    message: req.body.memory,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(path.join(__dirname, 'cairo_memory.json'), JSON.stringify(memoryData, null, 2));
  res.send(`<p style="color: white; font-family: sans-serif;">Memory received and saved. <a style="color:#00f;" href="/memory-uploader">Go back</a></p>`);
});

// Route to confirm memory was saved
app.get('/memory', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'cairo_memory.json'), 'utf-8');
    res.type('json').send(data);
  } catch (err) {
    res.status(404).send({ error: 'No memory found.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Cairo server is live on port ${PORT}`);
});
