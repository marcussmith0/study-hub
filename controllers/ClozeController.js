const _ = require("lodash");
const mongoose  = require("mongoose");
const { ObjectId } = require("mongodb");

const Cloze = require("./../models/cloze/Cloze");
const ClozeCard = require("./../models/cloze/ClozeCard");


exports.createClozeCard = (req, res) => {
    let body = _.pick(req.body, ["title", "description"]);
    let newCard = new ClozeCard(body);
    newCard.createdAt = new Date().getTime();

    newCard.save().then((group) => {
        res.send({group});
    }).catch(e => res.status(400).send());
}

exports.getAllGroups = (req, res) => {
    ClozeCard.find({}).then((cards) => {
        res.send({cards});
    }).catch(e => res.send(cards));
}

exports.getGroup = (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) return res.status(400).send();

    ClozeCard.findById(id).then((group) => {
        if(!group) return res.status(404).send();
        res.send({group});
    }).catch(e => res.status(400).send());
}

exports.updateGroup = (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) res.status(400).send();
    let body = _.pick(req.body, ["title", "description"]);

    if(!body.title || !body.description) return res.status(400).send();

    ClozeCard.findByIdAndUpdate(id, { $set : body }, {new: true}).then((group) => {
        res.send({group});
    }).catch(e => res.status(400).send());
}

exports.removeGroup = (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) res.status(400).send();

    ClozeCard.findByIdAndRemove(id).then((group) => {
        if(!group) res.status(404).send();
        res.send({group});
    }).catch(e => res.status(400).send());
}

exports.createSingleCloze = (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) return res.status(400).send();
    let body = _.pick(req.body, ["fullText", "deletion"]);
    let newCard = new Cloze(body);

    newCard.save().then(card => {
        return ClozeCard.findByIdAndUpdate(id, { $push: {cards : card}}, { new: true });
    }).then(group => {
        res.send({group});
    }).catch(e => res.status(400).send(e));
}

exports.removeCard = (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)) return res.status(400).send();

    Cloze.findByIdAndRemove(id).then(card => {
        if(!card) return res.status(404).send();

        return ClozeCard.findOneAndUpdate({cards: { $in: [card._id]}}, { $pull: {cards: card._id }}, { new: true});
    }).then((group) => {
        if(!group) return res.status(404).send();
        res.send({group});
    }).catch(e => res.status(400).send());
}

// exports.patchCard = (req, res) => {
//     let id = req.params.id;
//     if(!ObjectId.isValid(id)) return res.status(400).send();

//     let body = _.pick(req.body, ["fullText", "deletion"]);

//     if(!body.fullText || !body.deletion) return res.status(400).send();    

//     Cloze.findByIdAndUpdate(id, { $set: body }, { new: true }).then(card => {
//         if(!card) return res.status(404).send();

//         res.send({card});
//     }).catch(e => res.status(400).send(e));
// }