

module.exports = (app) => {
    app.post("/basic-card", BasicController.createCards);
}