const _ = require("lodash");
const mongoose  = require("mongoose");

const ClozeCard = require("./../models/cloze/ClozeCard");

exports.createClozeCard = (req, res) => {
    let body = _.pick(req.body, ["title", "description"]);
    let newCard = new ClozeCard(body);
    newCard.createdAt = new Date().getTime();

    newCard.save().then((group) => {
        res.send({group});
    }).catch(e => res.status(400).send());
}