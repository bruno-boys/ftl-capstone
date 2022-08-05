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

  static async logHabit(habitForm) {
    console.log(habitForm)
      await db.query(
        `
        INSERT INTO tracked_habits (habit_id, start_date, end_date)
        VALUES ($1, $2, $3);
        `, [habitForm.id, habitForm.startDate, habitForm.endDate]
    )
  }

  static async fetchLoggedHabitCount(habitId, startTime, endTime) {
    const results = await db.query(
      `
      SELECT COUNT(*) FROM tracked_habits
      WHERE (habit_id = $1)
      AND start_date = $2 
      AND end_date = $3;
      `, [habitId, startTime, endTime]
    )
    return results.rows[0];
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
            INSERT INTO habits (users_id, habit_name, frequency, period, start_date, temp_start_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6, $7);
            `,
      [
        user.email,
        habitForm.habitName,
        habitForm.frequency,
        habitForm.period,
        habitForm.startDate,
        habitForm.tempStartDate,
        habitForm.endDate
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
        const results = await db.query(`select completed_count from tracked_habits where habit_id = $1`, [habitInfo.id])

        const completedCount = results.rows[0]

        const output = Boolean(completedCount)

        if (output){
            return completedCount
        }
        else{
            return 0
        }
    }

   static async editHabit(form){
    console.log("form in edit habit", form)
    await db.query(`update habits set habit_name = $1, frequency = $2, period = $3, start_date = $4, end_date = $5, temp_start_date = $6 where id = $7`, [form.habitName, form.frequency, form.period, form.startDate, form.endDate, form.tempStartDate, form.id])
  }

}

module.exports = Habits;
