const express = require("express");
const app = express();

app.use(express.json());

let messages = [];

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const message = req.body.message;
  if (message) {
    messages.push({ message, time: new Date().toISOString() });
    res.status(201).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "No message provided" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Cairo server is live on port ${PORT}`);
});

