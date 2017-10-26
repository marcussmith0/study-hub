const _ = require("lodash");

const BasicCards = require("./../models/BasicCards");

exports.createCards = (req, res) => {
    let body = _.pick(req.body, ["title", "description"]);
    let newCards = new BasicCards(body);
}