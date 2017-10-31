const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardBasicSchema = new Schema({
    front: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    back: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports =  mongoose.model("CardBasic", CardBasicSchema);