const db = require("../db");

class Statistics {

    static async fetchDailyStreak(user) {
        /* fetches the current and longest number of consecutive days the user 
            has completed all their habits */
    }

    static async fetchHabitStreak(habitId) {
        /* fetches the current and longest number of consectutive days the user
            has completed the selected habit*/ 

    }

    static async fetchDailyLogAverage(user) {
        /* fetches the average number of logs for the user for
            all of their habits */
        const results = await db.query(
            `
            
            `
        )
    }

    static async fetchHabitLogAverage(habitId) {
        /* fetches the average number of logs for the user for
            the specified habit */

    }

}

module.exports = Statistics;