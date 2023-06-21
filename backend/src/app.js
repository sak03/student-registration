const express = require('express');
require('./db/connection')
const studentRouter = require("./routers/students");
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json())

app.use(studentRouter);

app.listen(port, () => {
    console.log(`Connection is setup at port no. ${port} ...`)
})