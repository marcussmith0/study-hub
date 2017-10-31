const ClozeController = require("./../controllers/ClozeController");

module.exports = (app) => {
    app.get("/cloze-card", ClozeController.getAllGroups);

    app.get("/cloze-card/:id", ClozeController.getGroup);

    app.post("/cloze-card", ClozeController.createClozeCard);

    app.patch("/cloze-card/:id", ClozeController.updateGroup);

}