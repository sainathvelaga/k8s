'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 3000;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello from jenkins\n');
  document.body.style.backgroundColor = "Pink";
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
