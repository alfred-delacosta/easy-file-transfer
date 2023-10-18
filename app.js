require('dotenv').config();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

//#region Routers
const userRouter = require('./Routers/UserRouter');
const authRouter = require('./Routers/AuthRouter');
//#endregion

const connectDb = require('./DB/DB');

//#region Express Setup
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT;
//#endregion

connectDb();

app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`Application live and listening on ${port}`);
})