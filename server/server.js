const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

/**
 * handle requests for static files
 */
app.use('/', express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
