const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const selfCheck = require("./self-check");
selfCheck.updateStatus("Cairo has just started and is running normally.");

app.get("/", (req, res) => {
  res.send("Cairo server is live!");
});

app.get("/status", (req, res) => {
  const status = selfCheck.getStatus();
  res.json(status);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
