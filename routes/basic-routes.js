const BasicController = require("./../controllers/BasicController");

module.exports = (app) => {
    app.get("/basic-card", BasicController.getAllGroups);

    app.get("/basic-card/:id", BasicController.getSingleGroup);

    app.post("/basic-card", BasicController.createCards);

    app.patch("/basic-card/:id", BasicController.patchCards);

    app.delete("/basic-card/:id", BasicController.removeCards);

    app.post("/basic-card/:id", BasicController.makeCards);

    app.get("/card-basic/:id", BasicController.getSingleCard);
}