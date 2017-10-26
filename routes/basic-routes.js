const BasicController = require("./../controllers/BasicController");

module.exports = (app) => {
    
    app.post("/basic-card", BasicController.createCards);
}