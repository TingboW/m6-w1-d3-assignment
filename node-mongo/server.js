const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
require('./app/models/booklist.model.js');

//Configuring the database
require('dotenv').config();
const mongoose = require('mongoose');

//Connecting to the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
.on('open', ()=> {
    console.log('Mongoose connection open');
})
.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});

//Create the server and port
require('./app/routes/booklist.router.js')(app);

//Create a server
const server = app.listen(8080, function() {
    const host = server.address().address
    const port = server.address().port

    console.log('App listening at http://%s:%s', host, port);
})