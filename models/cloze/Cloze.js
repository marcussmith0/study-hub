const mongoose = require("mongoose");
const RegexParser = require("regex-parser");

const Schema = mongoose.Schema;


const ClozeSchema = new Schema({
    fullText : {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    partialText: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    deletion: {
        type: String,
        trim: true,
        required: true,
        minlength: 1
    }
});

ClozeSchema.pre("save", (next) => {
    const re = RegexParser(`/\W${this.deletion}\W/`)
    const partialText = this.fullText.replace(re, "....");
    this.partialText = partialText;
    next();
});

module.exports = mongoose.model("Cloze", ClozeSchema);