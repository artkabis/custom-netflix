const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movies');
const listRoute = require('./routes/lists');
const cors = require('cors');
const path = require('path');

const app = express();
const result = dotenv.config({ path: '.env' });

if (result.error) {
  throw result.error;
}

console.log('env parsing : ', result.parsed);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connection Successfull'))
  .catch((err) => {
    console.error(err);
  });

  
//   var corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
app.use(cors());

/*app.set('trust proxy', function (ip) {
  console.log('ip adress proxy >>> ',ip);
  retunr true;
});
*/

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

// if (process.env.NODE.ENV === 'production') {
//   app.use(favicon(path.resolve(__dirname, '"./client/build"', 'favicon.ico')));
//   app.use(express.static(path.resolve(__dirname, './client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
//   });

  if(process.env.NODE.ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

}
const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log('Backend server is running at : ', port);
});
