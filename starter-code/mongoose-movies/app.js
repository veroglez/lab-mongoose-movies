const app = require('express')();
const mongoose = require('mongoose');
const globals = require('./config/db');

mongoose.connect(globals.dbURL).then(() => console.log('Connected to DB'));

app.locals.title = 'Mongoose movies'

require('./config/express')(app)

const layout = require('./routes/layout');
const celebrities = require('./routes/celebrities');

app.use('/', layout);
app.use('/celebrities', celebrities);

require('./config/handle-errors')(app)

module.exports = app;
