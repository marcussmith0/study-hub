const BasicController = require("./../controllers/BasicController");

module.exports = (app) => {
    app.get("/basic-card", BasicController.getAllGroups);
    app.post("/basic-card", BasicController.createCards);
}