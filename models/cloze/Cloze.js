const mongoose = requrie("mongoose");
const Schema = mongoose.Schema;

const ClozeSchema = new Schema({

});

module.exports = mongoose.model("Cloze", ClozeSchema);