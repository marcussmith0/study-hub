const _ = require("lodash");
const { ObjectID } = require("mongodb");

const Note = require("./../models/Notes");

exports.newNote = (req, res) => {
    let body = _.pick(req.body, ["title", "subtitle", "text"]);
    let newNote = new Note(body);
    newNote.createdAt = new Date().getTime();

    newNote.save().then((note) => {
        res.send(note);
    }).catch(e => res.status(400).send());
}

exports.getNotes = (req, res) => {
    Note.find().then((notes) => {
        res.send({notes});
    }).catch(e => res.status(400).send());
}

exports.getNote = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid) return res.status(400).send();
    
    Note.findById(id).then((note) => {
        res.send(note);
    }).catch(e => res.status(400).send());
}

exports.patchNote = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid) return res.status(400).send();
    
    let body = _.pick(req.body, ["title", "subtitle", "text"]);

    Note.findByIdAndUpdate(id, { $set: body }, { new: true }).then((note) => {
        res.send(note);
    }).catch(e => res.status(400).send());
}

exports.removeNote = (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid) return res.status(400).send();
    
    Note.findByIdAndRemove(id).then((note) => {
        res.send(note);
    }).catch(e => res.status(400).send());
}