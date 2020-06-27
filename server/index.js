// SERVER
require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const React = require('react');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString('<App />');

  const indexFile = path.resolve(path.join(__dirname, '/../client/dist/index.html'));
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="proxy"></div>', `<div id="proxy">${app}</div>`)
    );
  });
});

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

const port = process.env.PORT || 9999;

app.listen(port);

