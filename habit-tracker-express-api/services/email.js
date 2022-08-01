// const { config } = require("dotenv");
const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")

class EmailService {
    constructor(config) {
        //initialize
        const { isActive, apiKey } = config

        const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey }))

        this.transport = transport
        this.isActive = isActive


    }
}

module.exports = EmailService;