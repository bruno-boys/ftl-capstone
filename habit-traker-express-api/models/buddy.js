const db = require("../db");
const { nanoid } = require('nanoid')
// model.id = nanoid() //=> "V1StGXR8_Z5jdHi6B-myT"

class Buddy {

    static async generateURLId() {
        // this function generates a url to be sent out to other users
        return nanoid(10);
    }

    static async populateBuddyRequestTable(user, link) {
        // fills the buddy_request table with the user information and link
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


    static async acceptBuddyRequest(user, link) {
        // adds the users to the buddy table and allows them to become buddies
        await db.query(
            `
            INSERT INTO buddies (user_1, user_2) 
            VALUES ((SELECT users_id FROM buddy_request WHERE link = $1), 
                    (SELECT id FROM users WHERE email = $2));
            `, [link, user.email]
        );
        
        await db.query(
            `
            DELETE FROM buddy_request
            WHERE link = $1;
            `, [link]
        );
    }

}

module.exports = Buddy;