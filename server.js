const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/messages", (req, res) => {
  res.json([]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Cairo server is live on port ${PORT}`);
});
