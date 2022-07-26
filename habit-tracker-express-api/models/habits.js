const db = require('../db')

class Habits {

    static async fetchHabitList(user) {
        // retrieves all user habits
    }

    static async createHabit(user, habitForm) {

        console.log("User in model",user)
        //allows user to create habits
        const userEmail = user.email
        const habit = habitForm
        console.log("habit form", habitForm)

        await db.query(
            ` INSERT INTO habits (users_id, habit_name, frequency, period, start_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6);`, 
            [userEmail, habit.habitName, habit.frequency, habit.period, habit.startDate, habit.endDate]
        )


        return "me"

    }
    
}

module.exports = Habits;