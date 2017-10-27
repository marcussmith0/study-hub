const { ObjectID } = require("mongodb");
const _ = require("lodash");

const BasicCards = require("./../models/BasicCards");
const CardBasic = require("./../models/CardBasic");

exports.getAllGroups = (req, res) => {
    BasicCards.find({}).then((cards) => {
        res.send({cards});
    }).catch(e => res.status(400).send());
};
// WE WILL EVENTUALLY HAVE TO RUN THE 'POPULATE' QUERY ON THIS
exports.getSingleGroup = (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    BasicCards.findById(id).then((cards) => {
        if(!cards) return res.status(404).send();

        res.send({cards});
    }).catch(e => res.status(400).send());
};

exports.createCards = (req, res) => {
    let body = _.pick(req.body, ["title", "description"]);
    let newCards = new BasicCards(body);

    newCards.save().then((cards) => {
        res.send({cards});
    }).catch(e => res.status(400).send());
};

exports.patchCards = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();
    let body = _.pick(req.body, ["title", "description"]);

    BasicCards.findByIdAndUpdate(id, { $set: body}, { new: true }).then((cards) => {
        if(!cards) return res.status(404).send();

        res.send({cards});
    }).catch(e => res.status(400).send());
};

exports.removeCards = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    BasicCards.findByIdAndRemove(id).then((cards) => {
        if(!cards) return res.status(404).send();

        res.send({cards});
    }).catch(e => res.status(400).send());
};

exports.makeCards = (req,  res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();
    
    CardBasic.insertMany(req.body.cards).then((cards) => {
        if(!cards) return res.status(404).send();
        return BasicCards.findByIdAndUpdate(id, { $pushAll: { cards }}, { new: true});
    }).then((group) => {
        if(!group) return res.status(404).send();
        res.send({group});  
    }).catch(e => res.status(400).send());
};

exports.getSingleCard = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    CardBasic.findById(id).then((card) => {
        res.send({card});
    }).catch(e => res.status(400).send());
}

exports.patchCard = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) return res.status(400).send();

    CardBasic.findByIdAndUpdate(id, {$set: req.body}, { new: true }).then((card) => {
        res.send({card});
    }).catch(e => res.status(400).send());
}