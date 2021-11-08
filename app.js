let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let itemsRouter = require('./routes/items')

//MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = app;
