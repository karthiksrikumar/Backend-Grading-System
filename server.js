const bodyParser = require('body-parser')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const connectDatabse = require('./db');
const doordash = require("./routes/api/routes")

const PORT = process.env.PORT || 4000;
const app = express();


app.use(cors({
  origin: 'http://localhost:3000',  // replace with your application's URL
  credentials: true,  // IMPORTANT: enable credentials. This is needed for cookies to work
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev"))
app.use(helmet())
connectDatabse();
app.use("/v1/doordash",doordash)

// app.use("/api/v1/teach/ai/auth/controller", authControlller);
const server = app.listen(PORT, console.log(`API is listening on port ${PORT}`));
server.timeout = 25000; // 15 minute time out max

//http.https Rest APis
//http://localhost:4000/v1/doordash/register