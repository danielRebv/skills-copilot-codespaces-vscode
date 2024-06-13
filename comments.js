// Create web server with express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      res.send(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      const newComment = req.body;
      comments.push(newComment);
      fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.send('Comment added successfully');
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});