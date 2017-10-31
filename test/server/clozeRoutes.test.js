const expect = require("expect");
const request = require("supertest");
const { ObjectId } = require("mongodb");

const { app } = require("./../../server");
const ClozeCard = require("./../../models/cloze/ClozeCard");

const IDone = new ObjectId();
const IDtwo = new ObjectId();


const cards = [
    {_id: IDone, title: "title one", description: "description one",  createdAt: new Date().getTime()},
    {_id: IDtwo, title: "title two", description: "description two", createdAt: new Date().getTime()}
]

beforeEach((done) => {
    return ClozeCard.remove({}).then(() => {
        return ClozeCard.insertMany(cards);  
    }).then(() => done());
});

describe("POST /cloze-card", () => {
    it("create a new cloze card", (done) => {
        const title = "title";
        const description = "description";

        request(app)
            .post("/cloze-card")
            .send({title, description})
            .expect(200)
            .expect((res) => {
                expect(res.body.group.title).toBe(title);
                expect(res.body.group.description).toBe(description);
                expect(res.body.group.createdAt).toBeA("number");
            })
            .end((err, res) => {
                if (err) return done(err);

                ClozeCard.find({}).then((result) => {
                    expect(result.length).toBe(3);
                    done();
                }).catch(e => done(e));
            });
    });

    it("should not create a new cloze card", (done) => {
        const title = "";
        const description = "description";

        request(app)
            .post("/cloze-card")
            .send({title, description})
            .expect(400)
            .end(done);
    });
});

describe("GET /cloze-card", () => {
    it("should return all cards", (done) => {
        request(app)
            .get("/cloze-card")
            .expect(200)
            .expect((res) => {
                expect(res.body.cards.length).toBe(2);
            })
            .end(done);
    });
});

describe("GET /cloze-card/:id", () => {
    
    it("should return the correct card", (done) => {
        let id = cards[0]._id.toHexString();
        request(app)
            .get(`/cloze-card/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.group._id).toBe(id);
                expect(res.body.group.title).toBe("title one");
                expect(res.body.group.description).toBe("description one");
                expect(res.body.group.createdAt).toBeA("number");
            })
            .end(done);
    });

    it("should return a 400 error", (done) => {
        let id = cards[0]._id.toHexString() + "sdlf";

        request(app)
        .get(`/cloze-card/${id}`)
        .expect(400)
        .end(done);  
    });
});