const expect = require("expect");
const request = require("supertest");
const { ObjectId } = require("mongodb");

const { app } = require("./../../server");
const ClozeCard = require("./../../models/cloze/ClozeCard");

beforeEach((done) => {
    ClozeCard.remove({}).then(() => done());
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
                    expect(result.length).toBe(1);
                    done();
                })
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