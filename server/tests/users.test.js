const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app, db } = require("../app");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/users", () => {
  before((done) => {
    db.query("DELETE FROM users WHERE email='test@test.com'").then(() => {
      done();
    });
  });
  describe("POST /register", () => {
    it("it should create a new user (test@test.com)", (done) => {
      const user = {
        email: "test@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.email).to.eq("test@test.com");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should NOT create a new user (email exists)", (done) => {
      const user = {
        email: "alex@email.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Email already exists");
        done();
      });
    });
  });
  describe("POST /login", () => {
    it("it should login user in (alex@email.com)", (done) => {
      const user = {
        email: "alex@email.com",
        password: "1234"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.id).to.eq(1);
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should login user in (user@email.com)", (done) => {
      const user = {
        email: "user@email.com",
        password: "123456"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.id).to.eq(2);
        expect(res.status).to.eq(200);
        done();
      });
    });
  });
});
