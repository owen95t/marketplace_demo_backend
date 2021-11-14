const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db')
const session = require('express-session')
// const secret = require('./config/secret')
const MongoStore = require('connect-mongo')
const limiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')

//REQUIRE ROUTES
const indexRouter = require('./routes/index_router');
const usersRouter = require('./routes/users_router');
const itemsRouter = require('./routes/items_router')

//RATE LIMIT
const rateLimter = limiter({
    max: 200,
    window: 1000 * 60 * 15 //every 15 minute window, allow 200 requests
})

//DB
connectDB();

//EXPRESS SESSION SETUP WITH MONGODB AS SESSION STORE
app.use(session({
    secret: process.env.SESSION_SECRET || require('./config/secret').session_secret,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24, //one day
        sameSite: 'none', //change to none
        secure: true //for production
    },
    saveUninitialized: false, //dont create session until something is stored
    resave: false, //dont save session if unmodified
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || require('./config/secret').uri,
        collectionName: 'sessions'
    })
}))

//MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('json spaces', 2)
app.set('trust proxy', 1) // trust first proxy
app.use(rateLimter)
app.use(helmet())
app.use(cors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization', 'auth-token', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Origin', 'CSRFToken'],
    // exposedHeaders: ['Origin', 'Access-Control-Allow-Origin'],
    credentials: true,
    origin: ["http://localhost:8080", "http://localhost:3000", 'https://market-demo-1123.herokuapp.com'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" // ['GET', 'PUT', 'POST', 'DELETE']
}))

//USE ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

module.exports = app;
