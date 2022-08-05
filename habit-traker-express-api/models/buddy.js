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
            VALUES 
                ((SELECT users_id FROM buddy_request WHERE link = $1), (SELECT id FROM users WHERE email = $2)),
                ((SELECT id FROM users WHERE email = $2), (SELECT users_id FROM buddy_request WHERE link = $1));
            `, [link, user.email]
        );
        
        await db.query(
            `
            DELETE FROM buddy_request
            WHERE link = $1;
            `, [link]
        );
    }

    // static async fetchBuddy(user) {
    //     //uses the buddy's id from the database and fetches the buddy

    //     /* takes the logged in user and queries the db in order to find the 
    //         buddy that they are matched with.*/
    // }

    static async fetchBuddyId(user) {
       /* takes the logged in user and queries the db in order to find the 
            user id of buddy that they are matched with. */
        const buddy = await db.query(
            `
            SELECT user_2 FROM buddies WHERE user_1 = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        )
        return buddy.rows[0].user_2;
    }


    /*  It then uses the buddy's info to 
            fetch their habits, progress and other information*/

    static async fetchBuddyName(user) {
         /* calls the fetchBuddyId function in order to get 
                the name of user's buddy*/
        const buddyId = await Buddy.fetchBuddyId(user)

        const results = await db.query(
            `
            SELECT first_name, last_name FROM users WHERE id = $1;
            `, [buddyId]
        )
        return results.rows[0];
    }

    static async fetchBuddyHabits(user) {
        /* calls the fetchBuddyId function in order to get 
                the list of habits of user's buddy*/
        const buddyId = await Buddy.fetchBuddyId(user)

        const results = await db.query(
            `
            SELECT * FROM habits WHERE users_id = $1; 
            `, [buddyId]
        );
        return results.rows
    }

    static async fetchTrackedBuddyHabits(user) {
        /* calls the fetchBuddyId function in order to get 
                the list of tracked habits of user's buddy*/

                //figure out how to get tracked habits for all and individual habits
        const buddyId = await Buddy.fetchBuddyId(user)
    }

}

module.exports = Buddy;