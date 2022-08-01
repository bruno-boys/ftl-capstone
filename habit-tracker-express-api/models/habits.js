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

  static async logHabit(habitId) {
      await db.query(
        `
        INSERT INTO tracked_habits (habit_id)
        VALUES ($1);
        `, [habitId]
    )
  }

  static async fetchLoggedHabitCount(habitId, startTime, endTime) {
    const results = await db.query(
      `
      SELECT COUNT(*) FROM tracked_habits
      WHERE (habit_id = $1)
      AND logged_time >= $2 
      AND logged_time <= $3;
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

  static async editHabit(form){
    console.log("form", form)
    await db.query(`update habits set habit_name = $1, frequency = $2, period = $3, start_date = $4, end_date = $5 where id = $6`, [form.habitName, form.frequency, form.period, form.startDate, form.endDate, form.id])
  }

}

module.exports = Habits;
