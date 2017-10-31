const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClozeSchema = new Schema({
    fullText : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    word: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    }
});

module.exports = mongoose.model("Cloze", ClozeSchema);