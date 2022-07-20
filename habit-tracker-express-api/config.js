require('dotenv').config();
require('colors');

const PORT =  process.env.PORT ? Number(process.env.PORT) : 3001
const SECRET_KEY = process.env.SECRET_KEY || 'secret_dev'

function getDatabaseURI() {
    const dbUser = process.env.DATABASE_USER || 'postgres'
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres'
    const dbHost = process.env.DATABASE_HOST || 'localhost'
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || 'life_tracker'

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

console.log("LifeTracker Config:".red)
console.log("PORT:".blue, PORT)
console.log("SECRET_KEY:".blue, SECRET_KEY)
console.log("Database URI:".blue, getDatabaseURI())
console.log('---')

module.exports = {
    PORT,
    SECRET_KEY,
    getDatabaseURI
}