const db = require("../db");

class Reminders {
  static async fetchReminders() {
    // Hold off on this one for now
    /*
            takes the logged in user and queries the db in order to find the
            reminders that they have created.
        */

    const reminders = await db.query(
      `
            SELECT * FROM reminders
            `,
    );
    return reminders.rows;
  }

  static async fetchReminderById(habitId) {
    const habit = await db.query(
      `
            SELECT * FROM reminders
            WHERE habit_id = $1;
            `,
      [habitId]
    );  

    const result = await db.query(
      `
            SELECT * FROM habits
            WHERE id = $1;
            `,
      [habitId]
    );

    const obj = {
      reminder: habit.rows[0], 
      habit: result.rows[0]
    }
    return obj;
  }

  static async createReminder(habitId) {
    /*
             allows user to create reminders for speciic habits
             Should I be able to create a reminder for a habit that doesn't exist?
        */
    await db.query(
      `
            INSERT INTO reminders (habit_id, time)
            VALUES ((SELECT id FROM habits WHERE id = $1), $2);
            `,
      [habitId.habitId, habitId.time]
    );

  }

  static async deleteReminder(habitId) {
    /*
            allows user to delete reminders
        */
    await db.query(
      `
            DELETE FROM reminders
            WHERE (habit_id = $1);
                `,
      [habitId]
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
// Email for daily habits at 9am
// Email for weekly habits at the beginning of the week
// Email for montjly habits at the beginning of the month, middle of the month, and end of the month
