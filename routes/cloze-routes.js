const ClozeController = require("./../controllers/ClozeController");

module.exports = (app) => {

    app.post("/cloze-card", ClozeController.createClozeCard);

}