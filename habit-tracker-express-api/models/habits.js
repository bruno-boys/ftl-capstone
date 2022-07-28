const db = require("../db");

class Habits {
  static async fetchHabitList(user) {
    // retrieves all user habits using the user's email to filter the tables
    const results = await db.query(
      `
            SELECT * FROM habits
            WHERE users_id = (SELECT id FROM users WHERE email = $1);
            `,
      [user.email]
    );

    return results.rows;
  }

  static async fetchHabitById(user, habitId) {
    //allows for user to fetch a single habit by its id
    const results = await db.query(
      `
            SELECT * FROM habits
            WHERE (users_id = (SELECT id FROM users WHERE email = $1))
                AND (id = (SELECT id FROM habits WHERE id = $2));
            `,
      [user.email, habitId]
    );
    return results.rows[0];
  }

  static async createHabit(user, habitForm) {
    //allows user to create habits
    await db.query(
      ` 
            INSERT INTO habits (users_id, habit_name, frequency, period, start_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6);
            `,
      [
        user.email,
        habitForm.habitName,
        habitForm.frequency,
        habitForm.period,
        habitForm.startDate,
        habitForm.endDate,
      ]
    );
  }


  static async deleteHabit(user, habitId) {
    //allows user to delete habits
    await db.query(
      `
            DELETE FROM habits
            WHERE (users_id = (SELECT id FROM users WHERE email = $1))
                AND (id = (SELECT id FROM habits WHERE id = $2));
            `,
      [user.email, habitId]
    );
  }

    static async getCompletedCount(habitInfo){
        console.log("id", habitInfo.id)
        const results = await db.query(`select completed_count from tracked_habits where habit_id = $1`, [habitInfo.id])

        const completedCount = results.rows[0]

        console.log("completed count", completedCount)

        const output = Boolean(completedCount)

        if (output){
            return completedCount
        }
        else{
            return 0
        }
    }



}

module.exports = Habits;
