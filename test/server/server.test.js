const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const {app} = require("./../../server");
const BasicCards = require("./../../models/BasicCards");

const newIdOne = new ObjectID();
const newIdTwo = new ObjectID();
const newIdThree = new ObjectID();

const cards = [
    {_id: newIdOne, title: "title", description: "the test description"},
    {_id: newIdTwo, title: "title2", description: "the 2nd test description"},
    {_id: newIdThree, title: "title3", description: "the 3rd test description"}  
];

beforeEach((done) => {
    BasicCards.remove({}).then(() => {
        return BasicCards.insertMany(cards);
    }).then(() => done());
});

describe("POST /basic-cards", () => {
    it("should create a new set of cards in database", (done) => {
        var body = {title: "the title of test", description: "the descrioption"}
        
        request(app)
            .post("/basic-card")
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.cards.title).toBe("the title of test");
                expect(res.body.cards.description).toBe("the descrioption");
                expect(res.body.cards.cards).toEqual([]);
            }).end((err, res) => {
                if (err) return done(err);

                BasicCards.find({}).then((cards) => {
                    expect(cards.length).toBe(4);
                    done();
                }).catch(e => done(e));
            });

    });

    it("should not create a new set a of cards", (done) => {
        var body = {title: "", description: "the descrioption"}
        
        request(app)
            .post("/basic-card")
            .send(body)
            .expect(400)
            .end(done);
    });
});

describe("GET /basic-card", () => {
    it("should all basic cards", (done) => {
        request(app)
            .get("/basic-card")
            .expect(200)
            .expect((res) => {
                expect(res.body.cards.length).toBe(3);
            })
            .end(done);
    });
});

describe("GET /basic-card/:id", () => {
    it("should return correct card set", (done) => {
        var id = cards[0]._id.toHexString();
        request(app)
            .get(`/basic-card/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.cards.title).toBe("title");
                expect(res.body.cards.description).toBe("the test description");   
            })
            .end(done);
    });

    it("should return 400", (done) => {
        var id = cards[0]._id.toHexString() + "45";
        request(app)
            .get(`/basic-card/${id}`)
            .expect(400)
            .end(done);
    });
});

describe("PATCH /basic-card/:id", () => {

    it("should update the title", (done) => {
        var id = cards[0]._id.toHexString();
        var title = "THIS IS THE NEW TEST TITLE";
    
        request(app)
            .patch(`/basic-card/${id}`)
            .send({title})
            .expect(200)
            .expect((res) => {
                expect(res.body.cards.title).toBe(title);
            })
            .end(done);
    });
});