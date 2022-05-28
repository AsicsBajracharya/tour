const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'hello from the server side!!!!!',
  });
});

app.post('/', (req, res) => {
  res.send('you can post to this endpoint');
});

const port = 8000;
app.listen(port, () => {
  console.log('server started at port', port);
});
