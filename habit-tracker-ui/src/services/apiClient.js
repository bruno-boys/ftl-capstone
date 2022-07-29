import axios from 'axios'

class ApiClient {

    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = localStorage.getItem("habit_tracker_token") || null
        this.tokenName = "habit_tracker_token"
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

}

export default new ApiClient('http://localhost:3001')