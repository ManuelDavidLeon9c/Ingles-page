const express = require('express');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Serve static assets from root directory
app.use(express.static(path.join(__dirname), {
  extensions: ['html']
}));

// Fallback to index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`TenseLab server listening on http://${HOST}:${PORT}`);
});
