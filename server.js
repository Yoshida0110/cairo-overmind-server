const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// MongoDB connection
const uri = "mongodb+srv://kairo:Everusandy8@cluster0.mongodb.net/kairo?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Message schema and model
const messageSchema = new mongoose.Schema({
  message: String,
  time: String,
});
const Message = mongoose.model("Message", messageSchema);

// GET all messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ time: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

// POST a new message
app.post("/api/messages", async (req, res) => {
  const msg = req.body.message;
  if (!msg) {
    return res.status(400).json({ success: false, error: "No message provided" });
  }

  try {
    const newMsg = new Message({
      message: msg,
      time: new Date().toISOString(),
    });

    await newMsg.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Cairo server is live on port ${PORT}`);
});
