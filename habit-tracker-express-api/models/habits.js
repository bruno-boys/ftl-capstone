const db = require('../db')

class Habits {

    static async fetchHabitList(user) {
        // retrieves all user habits using the user's email to filter the tables
        const results = await db.query(
            `
            SELECT * FROM habits
            WHERE users_id = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        );

        return results.rows
    }

    static async fetchHabitById(user, habitId) {
        //allows for user to fetch a single habit by its id
        const results = await db.query(
            `
            SELECT * FROM habits
            WHERE (users_id = (SELECT id FROM users WHERE email = $1))
                AND (id = (SELECT id FROM habits WHERE id = $2));
            `, [user.email, habitId]
        );
        return results.rows[0]
    }

    static async createHabit(user, habitForm) {
        //allows user to create habits
        await db.query(
            ` 
            INSERT INTO habits (users_id, habit_name, frequency, period, start_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6);
            `, 
            [user.email, habitForm.habitName, habitForm.frequency, habitForm.period, habitForm.startDate, habitForm.endDate]
        )
    }

}

module.exports = Habits;