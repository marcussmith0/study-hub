const expect = require("expect");
const request = require("supertest");

const {app} = require("./../../server");
const BasicCards = require("./../../models/BasicCards");

const cards = [
    {title: "title", description: "the test description"},
    {title: "title2", description: "the 2nd test description"},
    {title: "title3", description: "the 3rd test description"}  
]

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