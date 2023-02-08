const express = require('express');
const request = require('request');
const path = require('path');

const app = express();

const metersURL = {
    url: 'https://snapmeter.com/api/public/meters/2080448990211/readings?start=2022-08-01&end=2023-02-01',
    headers: {'Authorization': '4f981c43-bf28-404c-ba22-461b5979b359'}
};
const serviceURL = {
    url: 'https://snapmeter.com/api/public/services/2080448990210/bills?start=2022-01-01&end=2023-02-01',
    headers: {'Authorization': '4f981c43-bf28-404c-ba22-461b5979b359'}
};


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'gridium-challenge/build')));



app.get('/meters', (req, res) => {
  request(
    metersURL,
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }

      res.json(JSON.parse(body));
    }
  )
});

app.get('/services', (req, res) => {
    request(
      serviceURL,
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/gridium-challenge/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));