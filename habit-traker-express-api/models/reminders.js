const db = require("../db");

class Reminders {
  static async fetchRemindersList(user) {

    const reminders = await db.query(
      `
            SELECT * FROM reminders
            WHERE users_id = (SELECT id FROM users WHERE email = $1)
            `, [user.email]
    );
    return reminders.rows;
  }

  static async fetchReminderById(user, habitId) {
    const habit = await db.query(
      `
            SELECT * FROM reminders
            WHERE (users_id = (SELECT id FROM users WHERE email = $1)) 
              AND (habit_id = $2);
            `,
      [user.email, habitId]
    );  

    const result = await db.query(
      `
            SELECT * FROM habits
            WHERE (users_id = (SELECT id FROM users WHERE email = $1))
                AND (id = $2);
            `,
      [user.email, habitId]
    );

    const obj = {
      reminder: habit.rows[0], 
      habit: result.rows[0]
    }
    return obj;
  }

  static async createReminder(user, habitId) {
    /*
             allows user to create reminders for speciic habits
             Should I be able to create a reminder for a habit that doesn't exist?
        */
       console.log("habit id in createReminder", habitId)
    await db.query(
      `
            INSERT INTO reminders (habit_id, time, users_id)
            VALUES ((SELECT id FROM habits WHERE id = $1), $2, (SELECT id FROM users WHERE email = $3));
            `,
      [habitId.habitId, habitId.remindTime, user.email]
    );

  }

  static async deleteReminder(user, habitId) {
    /*
            allows user to delete reminders
        */
    await db.query(
      `
            DELETE FROM reminders
            WHERE (users_id = (SELECT id FROM users WHERE email = $1))
              AND (habit_id = $2);
                `,
      [user.email, habitId]
    );
  }

  static async editReminder(habitId, remindTime) {
    /*
            allows user to edit reminders
        */
    await db.query(
      `
            UPDATE reminders
            SET time = $1
            WHERE (habit_id = $2);
            `,
      [remindTime.time, habitId]
    );
  }
}

module.exports = Reminders;
