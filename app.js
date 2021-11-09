const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db')

const indexRouter = require('./routes/index_router');
const usersRouter = require('./routes/users_router');
const itemsRouter = require('./routes/items_router')

//MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//DB
connectDB();

//ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = app;
