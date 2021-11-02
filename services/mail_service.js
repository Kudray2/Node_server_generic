const nodeMailer = require("nodemailer")

class MailService {
  constructor() {
    this.trasporter = nodeMailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }
  async sendActivationMail(to, link) {
    await this.trasporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject: "Account activation NODE generic server" + process.env.API_URL,
      text: "",
      html: `
        <div>
          <h1>Click link to activate the account</h1>
          <a href="${link}">${link} </a>
        </div>

        `,
    })
  }
}

module.exports = new MailService()
