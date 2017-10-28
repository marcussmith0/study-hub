const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const {app} = require("./../../server");
const BasicCards = require("./../../models/BasicCards");
const CardBasic = require("./../../models/CardBasic");


const newIdOne = new ObjectID();
const newIdTwo = new ObjectID();
const newIdThree = new ObjectID();

const cards = [
    {_id: newIdOne, title: "title", description: "the test description"},
    {_id: newIdTwo, title: "title2", description: "the 2nd test description"},
    {_id: newIdThree, title: "title3", description: "the 3rd test description"}  
];

const cardIdOne = new ObjectID();
const cardIdTwo = new ObjectID();
const cardIdThree = new ObjectID();

const singleCards = [
    {_id: cardIdOne, front: "first front", back: "first back"},
    {_id: cardIdTwo, front: "second front", back: "second back"},
    {_id: cardIdThree, front: "third front", back: "third back"}
]

beforeEach((done) => {
    BasicCards.remove({}).then(() => {
        return BasicCards.insertMany(cards);
    }).then(() => done());
});

beforeEach((done) => {
    CardBasic.remove({}).then(() => {
        return CardBasic.insertMany(singleCards);
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

    it("should not update the title, return 400", (done) => {
        var id = cards[0]._id.toHexString() + "not";
        var title = "";
    
        request(app)
            .patch(`/basic-card/${id}`)
            .send({title})
            .expect(400)
            .end(done);
    });
});

describe("DELETE /basic-card/:id", () => {
    
        it("should delete a group of cards", (done) => {
            var id = cards[0]._id.toHexString();
        
            request(app)
                .delete(`/basic-card/${id}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.cards._id).toBe(id);
                })
                .end((err, res) => {
                    if (err) return done(err);

                    BasicCards.find({}).then((cards) => {
                        expect(cards.length).toBe(2);
                        done();
                    }).catch(e => done(e));
                });
        });

        it("should not delete a group of cards, return 400", (done) => {
            var id = cards[0]._id.toHexString() + "messitup";
        
            request(app)
                .delete(`/basic-card/${id}`)
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);

                    BasicCards.find({}).then((cards) => {
                        expect(cards.length).toBe(3);
                        done();
                    }).catch(e => done(e));
                });
        });
    });

describe("POST /basic-card/:id", () => {
    it('add elements to BasicCards array', (done) => {
        let body = {
            cards: [
                {"front": "front1", "back": "back1"},
                {"front": "front2", "back": "back2"},
                {"front": "front3", "back": "back3"}
            ]
        }

        let id = cards[0]._id.toHexString();

        request(app)
            .post(`/basic-card/${id}`)
            .send(body)
            .expect(200)
            .expect((res) => {
                expect(res.body.group._id).toBe(id);
                expect(res.body.group.cards.length).toBe(3);
            })
            .end((err, res) => {
                if(err) return done(err);

                BasicCards.findById(id).then((cards) => {
                    expect(cards.cards.length).toBe(3);
                    done();
                }).catch(e => done(e));
            });
    });

    it("should not add element to BasicCards array", (done) => {
        let body = {
            cards: [
                {"front": "front1", "back": "back1"},
                {"front": "front2", "back": "back2"},
                {"front": "front3", "back": "back3"}
            ]
        }

        let id = cards[0]._id.toHexString() + "djsf";

        request(app)
            .post(`/basic-card/${id}`)
            .send(body)
            .expect(400)
            .end(done);
    });
});

describe("GET /card-basic/:id", () => {
    it("return the correct card", (done) => {
        let id = singleCards[0]._id.toHexString();
        request(app)
            .get(`/card-basic/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.card._id).toBe(id);
                expect(res.body.card.front).toBe(singleCards[0].front);
                expect(res.body.card.back).toBe(singleCards[0].back);                
            })
            .end(done);
    });

    it("return the wrong card", (done) => {
        let id = singleCards[1]._id.toHexString();
        request(app)
            .get(`/card-basic/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.card._id).toNotBe(singleCards[0]._id);
                expect(res.body.card.front).toNotBe(singleCards[0].front);
                expect(res.body.card.back).toNotBe(singleCards[0].back);                
            })
            .end(done);
    });

    it("return the correct card", (done) => {
        let id = singleCards[0]._id.toHexString() + "dfsajf;lkdajfl";
        request(app)
            .get(`/card-basic/${id}`)
            .expect(400)
            .end(done);
    }); 
});