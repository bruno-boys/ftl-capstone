const db = require("../db");

class Reminders {
  static async fetchReminders(user) {
    // Hold off on this one for now
    /*
            takes the logged in user and queries the db in order to find the
            reminders that they have created.
        */
  }

  static async createReminder(habitId, remindTime) {
    /*
             allows user to create reminders for speciic habits
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
