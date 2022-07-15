const express = require('express');
const app = express();

const path = require('path');
const PORT = 3002;


//require routers


//json parse and static files


//route handlers


//catch all route handlers


//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express middleware error occured',
        status: 500,
        message: {
            err: `${err} at middleware has occured`,
        },
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).json(errorObj.message)
})

//start server
app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`)
}); //listens on port 3002;