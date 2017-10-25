const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const url = process.env.MONGODB_URI || 'mongodb://localhost/StudyHub';
const PORT = process.env.PORT || 3000;

mongoose.connect(url);

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});