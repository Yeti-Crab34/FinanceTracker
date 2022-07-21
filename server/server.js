const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const PORT = 3002;

//require parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//require routers
const userRouter = require('./routers/userRouter');

//json parse and static files
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client')));

// app.use(cors());

//to avoid axios CORS errors IN development
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Origin-Methods', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

//route handlers
app.use('/', userRouter);

//catch all route handlers
app.use((req, res) => {
  return res.sendStatus(404);
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express middleware error occured',
    status: 500,
    message: {
      err: `${err} at middleware has occured`,
    },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

//start server
app.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
}); //listens on port 3002;
