const NotesController = require("./../controller/NotesController");

module.exports = (app) => {
    app.post("/note", NotesController.newNote);
    
    app.get("/note", NotesController.getNotes);

    app.get("/note/:id", NotesController.getNote);

    app.patch("/note/:id", NotesController.patchNote);

    app.delete("/note/:id", NotesController.removeNote);
}