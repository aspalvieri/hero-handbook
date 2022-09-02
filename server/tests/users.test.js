const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app, db } = require("../app");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/users", () => {
  before((done) => {
    db.query("DELETE FROM users WHERE email ILIKE '%@test.com'").then(() => {
      //db.query("SELECT SETVAL('users_id_seq', MAX(id)) FROM users").then(() => {
        done();
      //});
    });
  });
  describe("POST /register", () => {
    it("it should create a new user (tEST@teST.cOM)", (done) => {
      const user = {
        username: "TeSt",
        email: "tEST@teST.cOM",
        password: "AbCd1234",
        password2: "AbCd1234"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.email).to.eq("tEST@teST.cOM");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should create a new user (test2@test.com)", (done) => {
      const user = {
        username: "test2",
        email: "test2@test.com",
        password: "    ",
        password2: "    "
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.email).to.eq("test2@test.com");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should NOT create a new user (email exists)", (done) => {
      const user = {
        username: "alex2",
        email: "alex@email.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Email already exists");
        done();
      });
    });
    it("it should NOT create a new user (passwords do not match)", (done) => {
      const user = {
        username: "alex3",
        email: "alex3@email.com",
        password: "123456",
        password2: "1234567"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Passwords do not match");
        done();
      });
    });
    it("it should NOT create a new user (password too short)", (done) => {
      const user = {
        username: "alex3",
        email: "alex3@email.com",
        password: "123",
        password2: "123"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Password too short");
        done();
      });
    });
    it("it should NOT create a new user (username exists)", (done) => {
      const user = {
        username: "alex",
        email: "alex2@email.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Username already exists");
        done();
      });
    });
    it("it should NOT create a new user (username too short)", (done) => {
      const user = {
        username: "ale",
        email: "alex2@email.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Username too short");
        done();
      });
    });
    it("it should NOT create a new user (username too long)", (done) => {
      const user = {
        username: "1234567890123456789012345",
        email: "alex2@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Username too long");
        done();
      });
    });
    it("it should NOT create a new user (invalid email)", (done) => {
      const user = {
        username: "tester",
        email: "alex2%test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Invalid email");
        done();
      });
    });
    it("it should NOT create a new user (invalid username)", (done) => {
      const user = {
        username: "test%er",
        email: "alex2@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq("Invalid username");
        done();
      });
    });
  });
  describe("POST /login", () => {
    it("it should login user in (alex@email.com)", (done) => {
      const user = {
        account: "alex@email.com",
        password: "1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.username).to.eq("alex");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should login user in (hero)", (done) => {
      const user = {
        account: "hero",
        password: "1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.email).to.eq("hero@handbook.com");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should login user in (test@test.com)", (done) => {
      const user = {
        account: "test@test.com",
        password: "AbCd1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(user.username).to.eq("TeSt");
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should NOT login user in (Password incorrect)", (done) => {
      const user = {
        account: "test",
        password: "abcd1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(res.body.message).to.eq("Password incorrect");
        expect(res.status).to.eq(400);
        done();
      });
    });
    it("it should NOT login user in (Account not found)", (done) => {
      const user = {
        account: "fakeuser@email.com",
        password: "1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(res.body.message).to.eq("Account not found");
        expect(res.status).to.eq(404);
        done();
      });
    });
    it("it should NOT login user in (Invalid account - spaces)", (done) => {
      const user = {
        account: "   ",
        password: "abcd"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(res.body.message).to.eq("Invalid account");
        expect(res.status).to.eq(400);
        done();
      });
    });
    it("it should NOT login user in (Invalid account - non-alphanumeric)", (done) => {
      const user = {
        account: "hero123@",
        password: "1234"
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(res.body.message).to.eq("Invalid account");
        expect(res.status).to.eq(400);
        done();
      });
    });
    it("it should NOT login user in (Invalid password)", (done) => {
      const user = {
        account: "alex@email.com",
        password: ""
      };
      chai.request(app).post("/users/login")
      .send(user)
      .end((err, res) => {
        const user = res.body.user;
        expect(res.body.message).to.eq("Invalid password");
        expect(res.status).to.eq(400);
        done();
      });
    });
  });
});
