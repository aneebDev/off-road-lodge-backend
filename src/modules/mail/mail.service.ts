import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { EmailRequestConstant } from './constants/email-request.constant'
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMail(mailData: EmailRequestConstant) {
    this.mailerService
      .sendMail({
        to: mailData.to,
        from: mailData.from,
        subject: mailData.subject,
        text: mailData.content,
        cc: mailData.cc,
        bcc: mailData.bcc,
        html: mailData.template
      })
      .then(response => {
        return response
      })
      .catch(error => {
        console.warn(`Problem in sending email: ${error}`)
        throw error
      })
  }
}
