require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const SECRET_KEY = process.env.SECRET_KEY || "secret_dev";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

const IS_TESTING = process.env.NODE_ENV === "test";

const EMAIL_SERVICE_ACTIVE = IS_TESTING ? false : process.env.EMAIL_SERVICE_STATUS === "active";

const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS;

// const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const CLIENT_URL = process.env.CLIENT_URL || "https://habit-traker.surge.sh";


function getDatabaseURI() {
	const dbUser = process.env.DATABASE_USER || "postgres";
	const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
	const dbHost = process.env.DATABASE_HOST || "localhost";
	const dbPort = process.env.DATABASE_PORT || 5432;
	const dbName = process.env.DATABASE_NAME || "habit_traker";

	return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
}

const APPLICATION_NAME = "HabitTraker";

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log(`${APPLICATION_NAME} Config:`.red);
console.log("PORT:".blue, PORT);
console.log("SECRET_KEY:".blue, SECRET_KEY);
console.log("Database URI:".blue, getDatabaseURI());
console.log("SENDGRID_API_key:".blue, SENDGRID_API_KEY);
console.log("EMAIL_SERVICE_ACTIVE:".blue, EMAIL_SERVICE_ACTIVE);
console.log("CLIENT_URL:".blue, CLIENT_URL);
console.log("EMAIL_FROM_ADDRESS:".blue, EMAIL_FROM_ADDRESS);
console.log("---");

module.exports = {
	PORT,
	SECRET_KEY,
	getDatabaseURI,
	SENDGRID_API_KEY,
	EMAIL_SERVICE_ACTIVE,
	IS_TESTING,
	EMAIL_FROM_ADDRESS,
	CLIENT_URL,
	APPLICATION_NAME,
	BCRYPT_WORK_FACTOR,
};
