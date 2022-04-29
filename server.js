'use strict';

const express = require('express');

// Constants
const PORT = process.env.PORT || 3000;

// App
const app = express();
app.get('/', function (req, res) {
  res.send('Hello from Kubernetes\n');
});

// change background color for whole body..
function changebackground(){
	document.body.style.backgroundColor = 'aqua';
}
 

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
