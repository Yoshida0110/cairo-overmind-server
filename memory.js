const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, 'cairo-memory.json');

// Load existing memories or start fresh
let memories = [];
if (fs.existsSync(MEMORY_FILE)) {
  const fileData = fs.readFileSync(MEMORY_FILE, 'utf8');
  memories = JSON.parse(fileData) || [];
}

// Save all memories to file
function saveMemory() {
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memories, null, 2));
}

// Add a new memory
function addMemory(content) {
  const newMemory = {
    content,
    timestamp: new Date().toISOString()
  };
  memories.push(newMemory);
  saveMemory();
}

// Get all memories
function getAllMemories() {
  return memories;
}

module.exports = { addMemory, getAllMemories };

