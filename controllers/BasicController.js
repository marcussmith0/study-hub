const _ = require("lodash");

const BasicCards = require("./../models/BasicCards");

exports.getAllGroups = (req, res) => {
    BasicCards.find({}).then((cards) => {
        res.send({cards});
    }).catch(e => res.status(400).send());
}

exports.createCards = (req, res) => {
    let body = _.pick(req.body, ["title", "description"]);
    let newCards = new BasicCards(body);

    newCards.save().then((cards) => {
        res.send({cards});
    }).catch(e => res.status(400).send());
}