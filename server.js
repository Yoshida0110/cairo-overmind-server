app.get("/memory", (req, res) => {
  if (!cairoMemory || !cairoMemory.message) {
    return res.status(404).send("No memory found.");
  }
  res.send(cairoMemory);
});
