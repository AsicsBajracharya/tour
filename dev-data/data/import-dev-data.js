const fs = require('fs');

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const Tour = require('../../Models/tourModel');

dotenv.config({ path: './config.env' });

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

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// //IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded');
    process.exit(); //STOPS AN APPLICATION
  } catch (e) {
    console.log(e, 'there was an error');
  }
};

// //DELETE ALL DATA FROMCOLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
    process.exit(); //STOPS AN APPLICATION
  } catch (e) {
    console.log('there was an error while deleting data', e);
  }
};

if (process.argv[2] == '--import') {
  importData();
}

if (process.argv[2] == '--delete') {
  deleteData();
}

console.log(process.argv);
