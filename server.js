const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Only serve static files — no API routes, no backend logic (AR-01)
const server = app.listen(PORT, () => {
  console.log(`Breakout server running at http://localhost:${PORT}`);
});

module.exports = { app, server };
