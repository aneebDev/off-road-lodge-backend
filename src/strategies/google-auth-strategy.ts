import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import { AuthService } from '../modules/auth/auth.service'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService, readonly authService: AuthService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: `${configService.get('BASE_URL')}${configService.get('GOOGLE_CALLBACK_URL')}`,
      scope: ['email', 'profile']
    })
  }

  async validate(_: string, __: string, profile: any, done: VerifyCallback) {
    const { name, emails } = profile
    const user = {
      email: emails[0].value,
      name: name.givenName,
      username: name.familyName
    }
    const result = await this.authService.saveUserToDatabase(user)
    done(null, result)
  }
}
