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

    static async createHabit(user, habitForm) {
        //allows user to create habits
        const userEmail = user.email
        const habit = habitForm
        console.log("habit form", habitForm)

        await db.query(
            ` INSERT INTO habits (users_id, habit_name, frequency, period, start_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6);`, 
            [userEmail, habit.habitName, habit.frequency, habit.period, habit.startDate, habit.endDate]
        )
    }

}

module.exports = Habits;