const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//FOR HOSTED DATABASE
const DB = process.env.DATABASE.replace(
  //CREATING THE CONNECTION STRING
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESSFUL');
  });

//FOR DATABASE LOCAL

// const DB = process.env.DATABASE_LOCAL.replace(
//   //CREATING THE CONNECTION STRING
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log('DB CONNECTION SUCCESSFUL');
//   });

// console.log(app.get('env')); //SET BY EXPRESS
// console.log(process.env); //COMES FROM THE PROCESS CORE MODULE

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started at port', port);
});
