const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BasicCardsSchema = new Schema({
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
        ref: "CardBasic"
    }],
    createdAt: Number
});

module.exports = mongoose.model("BasicCards", BasicCardsSchema);