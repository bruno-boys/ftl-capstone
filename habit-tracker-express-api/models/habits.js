const db = require('../db')

class Habits {

    static async fetchHabitList(user) {
        // retrieves all user habits using the user's email to filter the tables
        const results = await db.query(
            `
            SELECT * FROM habits
            WHERE users_id = (SELECT id FROM users WHERE email = $1)
            `, [user.email]
        );

        return results.rows
    }


    static async createHabit(user) {
        //allows user to create habits
    }

}

module.exports = Habits;