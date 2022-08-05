const db = require("../db");
const { nanoid } = require('nanoid')
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

class Buddy {

    static async generateURLId() {
        //this function generates a url to be sent out to other users
        return nanoid(10);
    }

    static async populateBuddyRequestTable(user, link) {
        //fills the buddy_request table with the user information and link
        await db.query(
            `
            DELETE FROM buddy_request
            WHERE users_id = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        );
        
        await db.query(
            `
            INSERT INTO buddy_request(users_id, link) 
            VALUES ((SELECT id FROM users WHERE email = $1), $2);
            `, [user.email, link]
            );
    }
}

module.exports = Buddy;