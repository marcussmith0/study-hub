require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT;
const { mongoose } = require("./db/mongoose");

app.use(bodyParser.json());

require("./routes/basic-routes")(app);

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
});

module.exports = {
    app
}