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
            INSERT INTO habits (users_id, habit_name, frequency, period, start_date, temp_start_date, temp_end_date, end_date)
            VALUES ((select id from users where email = $1), $2, $3, $4, $5, $6, $7, $8);
            `,
      [
        user.email,
        habitForm.habitName,
        habitForm.frequency,
        habitForm.period,
        habitForm.startDate,
        habitForm.tempStartDate,
        habitForm.tempEndDate,
        habitForm.endDate
      ]
    );
  }

  static async logComplete(completedForm){

    await db.query(
      `insert into completed_habits (habit_id, completed_count) values ($1, $2);`, [completedForm.id, completedForm.completedCount]
    )
  }

  static async fetchCompletedCount(habitId){
    const results = await db.query(`select completed_count from completed_habits where habit_id = $1`, [habitId])
    return results.rows[0]
    
  }

  static async fetchMissedCount(habitId){
    const results = await db.query(`select missed_count from missed_habits where habit_id = $1`, [habitId])
    return results.rows[0]
  }

  static async editCompleted(completedForm){
  
      await db.query(`update completed_habits set completed_count = $1 where habit_id = $2`, [completedForm.completedCount, completedForm.id])
  }

  static async logMissed(missedForm){

    await db.query(
      `insert into missed_habits (habit_id, missed_count) values ($1, $2);`, [missedForm.id, missedForm.missedCount]
    )
  }

  static async editMissed(missedForm){
  
    await db.query(`update missed_habits set missed_count = $1 where habit_id = $2`, [missedForm.missedCount, missedForm.id])
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
    await db.query(`update habits set habit_name = $1, frequency = $2, period = $3, start_date = $4, end_date = $5, temp_start_date = $6, temp_end_date = $7 where id = $8`, [form.habitName, form.frequency, form.period, form.startDate, form.endDate, form.tempStartDate, form.tempEndDate, form.id])
  }
  
  static async fetchStreakCount(habitId, startTime, endTime){
    console.log("This is the startTime", startTime, " and end time", endTime, " using to get the streaks")
    const results = await db.query(
      `
      SELECT current_streak FROM habit_progress
      WHERE (habit_id = $1)
      AND start_date = $2 
      AND end_date = $3;
      `, [habitId, startTime, endTime]
    )
    const streakCount = results.rows[0];
    console.log("streakCount", streakCount)
    console.log(Boolean(streakCount))
    if (Boolean(streakCount)){
      console.log("tried to return undefine??")
      return streakCount
    }
    else{
      return {current_streak : 0}
    }
   

  }

  static async logProgress(progressForm){
    await db.query(
      `
      INSERT INTO habit_progress (habit_id, start_date, end_date, current_streak)
      VALUES ($1, $2, $3, $4);
      `, [progressForm.habitId, progressForm.startDate, progressForm.endDate, progressForm.current_streak]
  )
  }

}

module.exports = Habits;
