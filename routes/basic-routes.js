const BasicController = require("./../controllers/BasicController");

module.exports = (app) => {
    app.get("/basic-card", BasicController.getAllGroups);

    app.get("/basic-card/:id", BasicController.getSingleGroup);

    app.post("/basic-card", BasicController.createCards);
}