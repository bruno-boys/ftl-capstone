const db = require("../db");
const { nanoid } = require('nanoid')
const { BadRequestError } = require('../utils/error')
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

        const results = await db.query(
            `
            SELECT expires_at FROM buddy_request WHERE link = $1;
            `, [link]
        );

        var today = new Date();
        const expirationDate = results.rows[0].expires_at

        if (today < expirationDate) {
            const userTwo = await db.query(
                `
                SELECT users_id FROM buddy_request WHERE link = $1;
                `, [link]
            );

            const userTwoId = userTwo.rows[0].users_id;

            const userOne = await db.query(
                `
                SELECT id FROM users WHERE email = $1;
                `, [user.email]
            )

            const userOneId = userOne.rows[0].id;

            const results = await db.query(
                `
                SELECT COUNT(*) FROM buddies 
                WHERE user_1 = $1 AND user_2 = $2
                    OR user_1 = $2 AND user_2 = $1;
                `, [userTwoId, userOneId]
            )

            const count = parseInt(results.rows[0].count);
            

            if (count > 0){ throw new BadRequestError('You are already matched with this Buddy.') }

            await db.query(
                `
                INSERT INTO buddies (user_1, user_2) 
                VALUES 
                    ((SELECT users_id FROM buddy_request WHERE link = $1), (SELECT id FROM users WHERE email = $2)),
                    ((SELECT id FROM users WHERE email = $2), (SELECT users_id FROM buddy_request WHERE link = $1));
                `, [link, user.email]
            );
        }

        await Buddy.deleteBuddyRequest(link)
        
    }

    static async deleteBuddyRequest(link) {
        // this function removes the row with the specified link
        // from the buddy_request table
        await db.query(
            `
            DELETE FROM buddy_request
            WHERE link = $1;
            `, [link]
        );
    }


    static async fetchBuddyNameFromLink(link) {
        // fetches the user who generated the link from
        // the database using the link itself
        const results = await db.query(
            `
            SELECT users_id FROM buddy_request WHERE link = $1;
            `, [link]
        );

        const userId = results.rows[0].users_id

        const buddyName = await db.query(
            `
            SELECT first_name, last_name FROM users
            WHERE id = $1;
            `, [userId]
        );

        return buddyName.rows[0];

    }


    static async fetchBuddyIds(user) {
       /* takes the logged in user and queries the db in order to find the 
            user ids of buddies that they are matched with. */
        const buddy = await db.query(
            `
            SELECT user_2 FROM buddies WHERE user_1 = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        )
        const results = buddy.rows.map((buddy) => buddy.user_2)
        return results;
    }


    static async fetchBuddyInfo(user) {

        const idArray = await Buddy.fetchBuddyIds(user);
        const stringIdArray = `(${idArray.join(",")})`;
        const buddies = await db.query(
            `
            SELECT id, first_name, last_name, profile_photo FROM users WHERE id IN ${stringIdArray};
            `
        );
        return buddies.rows
    }

    static async fetchBuddyHabits(buddyId) {
        /* calls the fetchBuddyIds function in order to get 
                the list of habits of user's buddy*/

        // const idArray = await Buddy.fetchBuddyIds(user);
        // const stringIdArray = `(${idArray.join(",")})`;

        /* [2,3] */

        const buddyHabits = await db.query(
            `
            SELECT * FROM habits WHERE users_id = $1; 
            `, [buddyId]
        );
        return buddyHabits.rows
    }

    static async removeBuddy(user, buddyId) {
        /* this function removes a buddy by deleting the row in the buddies table where
            both users are present */
        
        await db.query(
            `
            DELETE FROM buddies
            WHERE user_1 = (SELECT id FROM users WHERE email = $1) AND user_2 = $2;
            `, [user.email, buddyId]
        );

        await db.query(
            `
            DELETE FROM buddies
            WHERE user_1 = $1 AND user_2 = (SELECT id FROM users WHERE email = $2);
            `, [buddyId, user.email]
        )

    }

}

module.exports = Buddy;