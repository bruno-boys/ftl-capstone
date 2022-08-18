const bcrypt = require('bcrypt')
const args = require('minimist')(process.argv.slice(2));

async function generateHashedPasswords(args) {
    const hashedPassword = await bcrypt.hash(args, 10);
    if (hashedPassword) {
        console.log("hashed password =",hashedPassword)
    }
}

generateHashedPasswords(args._[0]);