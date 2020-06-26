// SERVER
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

const port = process.env.PORT || 9999;

app.listen(port);

app.get('/loaderio-f7580e7f25f4662dc3db2caf6bedab06', (req, res) => {
  res.sendFile('loaderio-f7580e7f25f4662dc3db2caf6bedab06.txt', {
    root: `${__dirname}/../`,
  });
});

app.get('/listing/:productNumber', (req, res) => {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client/dist'),
  });
});

