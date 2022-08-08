import axios from 'axios'

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = localStorage.getItem("habit_traker_token") || null
        this.tokenName = "habit_traker_token"
    }

    setToken(token) {
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = 'GET', data = {} }) {

        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type": "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        }
        catch(error) {
            console.error({ errorResponse: error.response })
            const message = error?.response
            return { data: null, error: message || String(error) }
        }
    }

    async fetchUserFromToken() {
        return await this.request({ endpoint: `auth/me`, method: `GET` })
    }

    async loginUser(credentials) {
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async registerUser(credentials) {
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async createHabit(credentials){
        return await this.request({endpoint : `habits/create`, method: `POST`, data: credentials })
    }

    async fetchHabitList() {
        return await this.request({ endpoint: `habits/`, method: `GET` })
    }

    async fetchHabitById(habitId) {
        return await this.request({ endpoint: `habits/${habitId}`, method: `GET` })
    }

    async deleteHabit(habitId) {
        return await this.request({ endpoint: `habits/${habitId}`, method: `DELETE` })
    }

    async editHabit(form){
        return await this.request({endpoint : `habits/edit`, method: `PUT`, data: form})
    }

    async logHabit(habitId) {
        return await this.request({ endpoint: `habits/log`, method: `POST`, data: habitId })
    }
    
    async fetchLoggedHabitCount(logData) {
        //logData = {habitId, startTime, endTime}
        return await this.request({ endpoint: `habits/log?habitId=${logData.habitId}&startTime=${logData.startTime}&endTime=${logData.endTime}`, method: `GET` })
    }

    async recoverAccount(email) {
        return await this.request({ endpoint: `auth/recover`, method: `POST`, data: email })
    }

    async resetPassword({ token, newPassword }) {
        return await this.request({
          endpoint: `auth/password-reset?token=${token}`,
          method: `POST`,
          data: { newPassword },
        })
      }

    async editUser(form){
        console.log("form in edit user", form)
        return await this.request({endpoint: `auth/editUser`, method : `PUT`, data : form})
    }

    async editPhoto(form){
        console.log("form in edit photo", form)
        return await this.request({endpoint: `auth/editPhoto`, method : `PUT`, data : form})
    }

    async generateURLId() {
        return await this.request({ endpoint: `buddy`, method: `GET` })
    }

    async acceptBuddyRequest(link) {
        return await this.request({ endpoint: `buddy/accept`, method: `POST`, data: link })
    }
    async logProgress(progressForm){
        return await this.request({endpoint : `habits/streak`, method : `POST`, data : progressForm})
    }
    async fetchStreakCount(logData){
        return await this.request({ endpoint: `habits/streak?habitId=${logData.habitId}&startDate=${logData.startDate}&endDate=${logData.endDate}`, method: `GET` })
    }
}

export default new ApiClient('http://localhost:3001')