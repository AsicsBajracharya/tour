const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(app.get('env')); //SET BY EXPRESS
// console.log(process.env); //COMES FROM THE PROCESS CORE MODULE

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server started at port', port);
});
