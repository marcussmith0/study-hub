const _ = require("lodash");
const { ObjectID } = require("mongodb");

const BasicCards = require("./../models/BasicCards");

exports.getAllGroups = (req, res) => {
    BasicCards.find({}).then((cards) => {
        res.send({cards});
    }).catch(e => res.status(400).send());
}

exports.getSingleGroup = (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    BasicCards.findById(id).then((cards) => {
        if(!cards) return res.status(404).send();

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

exports.patchCards = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();
    let body = _.pick(req.body, ["title", "description"]);

    BasicCards.findByIdAndUpdate(id, { $set: body}, { new: true }).then((cards) => {
        if(!cards) return res.status(404).send();
        
        res.send({cards});
    }).catch(e => res.status(400).send());
}