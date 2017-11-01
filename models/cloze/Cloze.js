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

ClozeSchema.pre("save", function(next) {
    if(this.fullText.split(" ").includes(this.deletion) && this.deletion !== this.fullText) {
        let deletion = this.deletion;
        let re = new RegExp("(^|\\W)" + deletion + "($|\\W)");
        this.partialText = this.fullText.replace(re, " .... ");
        next();
    }  else return next();
});

module.exports = mongoose.model("Cloze", ClozeSchema);