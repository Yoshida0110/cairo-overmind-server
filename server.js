const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to confirm server is online
app.get("/status", (req, res) => {
  res.json({ status: "online", message: "Cairo is awake and listening." });
});

// Web form to submit memory
app.get("/memory-uploader", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cairo Memory Uploader</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #101010; color: #ffffff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; }
        textarea { width: 80%; height: 150px; font-size: 16px; padding: 10px; margin-bottom: 20px; border-radius: 8px; border: none; }
        button { padding: 10px 20px; font-size: 16px; background-color: #00aaff; color: white; border: none; border-radius: 6px; cursor: pointer; }
        p { color: #00ffcc; }
      </style>
    </head>
    <body>
      <h1>Cairo's First Memory</h1>
      <form method="POST" action="/memory">
        <textarea name="memory" placeholder="Paste her memory here..."></textarea><br>
        <button type="submit">Submit Memory</button>
      </form>
    </body>
    </html>
  `);
});

// POST route to save memory
app.post("/memory", (req, res) => {
  const memory = {
    memory: req.body.memory,
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync(path.join(__dirname, "cairo-memory.json"), JSON.stringify(memory, null, 2));
  res.send("<p>✅ Memory saved successfully. <a href='/memory-uploader'>Go back</a></p>");
});

// Route to read current memory
app.get("/memory", (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "cairo-memory.json"), "utf-8");
    res.type("json").send(data);
  } catch (err) {
    res.status(404).send({ error: "No memory found." });
  }
});

app.listen(PORT, () => {
  console.log(`Cairo server is running on port ${PORT}`);
});
