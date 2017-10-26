const expect = require("expect");
const request = require("supertest");

const {app} = require("./../../server");
const BasicCards = require("./../../models/BasicCards");

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
            }).end(done);

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