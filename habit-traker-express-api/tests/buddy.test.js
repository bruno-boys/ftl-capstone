const request = require("supertest");
const app = require("../app")
const db = require('../db')
const tokens = require('../utils/tokens');
const axios = require("axios");

const testToken = tokens.createUserJwt({ email: "test101@gmail.com" })

async function commonBeforeAll() {
    // delete all current test data
    await db.query(`DELETE FROM buddies`)
    const registerObj = {
      firstName: "Test",
      lastName: "Me",
      email: "test101@gmail.com",
      password: "test"
    }
    await axios.post('http://localhost:3001/auth/register', registerObj);
  }
  
  async function commonBeforeEach() {
    await db.query("BEGIN")
  }
  
  async function commonAfterEach() {
    await db.query("ROLLBACK")
  }
  
  async function commonAfterAll() {
    await db.end()
  }
  
  beforeAll(commonBeforeAll)
  beforeEach(commonBeforeEach)
  afterEach(commonAfterEach)
  afterAll(commonAfterAll)


/************************************** GET /buddy/ */
describe("GET /buddy/", () => {
    test("Authed user can generate buddy urls", async () => {
      const res = await request(app).get(`/buddy/`).set("authorization", `Bearer ${testToken}`)
  
      expect(res.statusCode).toEqual(201)
  
      const buddyLink = res.body

      expect(buddyLink).toEqual({
       url: expect.any(String)
      });
    })
  
    test("Throws Unauthorized error when user is unauthenticated", async () => {
      const res = await request(app).get(`/buddy/`)
      expect(res.statusCode).toEqual(500)
    })
  })


/************************************** GET /buddy/view */
describe("GET /buddy/view", () => {
    test("Authed user matched with Buddy can view their information", async () => {
      const res = await request(app).get(`/buddy/view`).set("authorization", `Bearer ${testToken}`)
  
      expect(res.statusCode).toEqual(200)
  
      const buddyView = res.body

      expect(buddyView).toEqual({
       url: expect.any(String)
      });
    })
  
    test("Throws Unauthorized error when user is unauthenticated", async () => {
      const res = await request(app).get(`/buddy/`)
      expect(res.statusCode).toEqual(500)
    })
  })
