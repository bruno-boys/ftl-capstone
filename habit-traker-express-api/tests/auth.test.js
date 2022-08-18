const { default: axios } = require("axios");
const request = require("supertest");
const app = require("../app");
const db = require("../db");

async function commonBeforeAll() {
	// delete all current test data
	await db.query(`DELETE FROM users`);
	const registerObj = {
		firstName: "Test",
		lastName: "Me",
		email: "test101@gmail.com",
		password: "test",
	};
	await axios.post("http://localhost:3001/auth/register", registerObj);
}

async function commonBeforeEach() {
	await db.query("BEGIN");
}

async function commonAfterEach() {
	await db.query("ROLLBACK");
}

async function commonAfterAll() {
	await db.end();
}

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/register */
describe("POST /auth/register/", () => {
	test("Allows user to register with valid credentials", async () => {
		const res = await request(app).post("/auth/register/").send({
			firstName: "Test",
			lastName: "Me Too",
			email: "test102@gmail.com",
			password: "test",
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toEqual({
			token: expect.any(String),
			user: {
				id: expect.any(Number),
				firstName: "Test",
				lastName: "Me Too",
				email: "test102@gmail.com",
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			},
		});
	});

	test("Throws Bad Request error when user doesn't provide all fields", async () => {
		const res = await request(app).post("/auth/register/").send({
			email: "test103@gmail.com",
		});
		expect(res.statusCode).toEqual(400);
	});
});

/************************************** POST /auth/login */

describe("Auth Routes", () => {
	describe("POST /auth/login/", () => {
		test("User can login successfully with valid credentials", async () => {
			const res = await request(app).post("/auth/login/").send({
				email: "test101@gmail.com",
				password: "test",
			});
			expect(res.body.token).toEqual(expect.any(String));

			expect(res.body.user).toEqual({
				id: expect.any(Number),
				firstName: "Test",
				lastName: "Me",
				email: "test101@gmail.com",
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				profilePhoto: null,
			});
		});
	});

	test("Throws Unauthenticated error when user doesn't exist in db", async () => {
		const res = await request(app).post("/auth/login/").send({
			email: "somebody_else@users.com",
			password: "password",
		});
		expect(res.statusCode).toEqual(401);
	});

	test("Throws Unauthenticated error when user provides wrong password", async () => {
		const res = await request(app).post("/auth/login/").send({
			email: "test101@gmail.com",
			password: "nope",
		});
		expect(res.statusCode).toEqual(401);
	});

	test("Throws Bad Request error when user doesn't provide password", async () => {
		const res = await request(app).post("/auth/login/").send({
			email: "test101@gmail.com",
		});
		expect(res.statusCode).toEqual(400);
	});

	test("Throws Bad Request error when user doesn't provide email", async () => {
		const res = await request(app).post("/auth/login/").send({
			password: "test",
		});
		expect(res.statusCode).toEqual(400);
	});
});
