const express = require('express');

const fs = require('fs');

const app = express();

//MIDDLWARES
app.use(express.json()); //ADDS DATA TO THE REQUEST BODY

// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'hello from the server side!!!!!',
//   });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint');
// });

//READ DEV DATA
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//HANDLING GET REQUEST
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours?.length,
    data: {
      tours,
    },
  });
});

//HANDLING POST REQUEST
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        message: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 8000;
app.listen(port, () => {
  console.log('server started at port', port);
});
