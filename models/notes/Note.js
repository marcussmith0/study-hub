const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },

    subtitle: String,

    text: {
        type: String,
        trim: true
    },

    createdAt: Number
});

module.exports = mongoose.model("Note", noteSchema);