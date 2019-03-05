const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

// define port number
const port = process.env.PORT || 3000;

// initialize server
const app = express();

// middleware
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

// serving static files
app.use('/', express.static(path.join(__dirname, 'public')));

// listening on port
app.listen(port, () => console.log(`listening on port ${port}...`));
