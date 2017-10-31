const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClozeCardsSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        trim: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: "Cloze"
    }],
    createdAt: Number
});

module.exports = mongoose.model("ClozeCard", ClozeCardsSchema);