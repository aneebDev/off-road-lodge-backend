import {
  BadRequestException,
  Body,
  ConflictException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from '../users/schemas/user.schema'
import { MailerService } from '@nestjs-modules/mailer'
import JwtTokensInterface from './interfaces/jwt-token.interface'
import * as handlebars from 'handlebars'
import * as fs from 'fs'
import changeUserPasswordTokenVerificationInterface from './interfaces/change-user-password-token-verification.interface'
import { generateRandomToken } from '../../helpers/randomToken.helper'
import changeUserPasswordInterface from './interfaces/change-user-password.interface'
import signupUserInterface from './interfaces/signup-user.interface'
import randomUserTokenInterface from './interfaces/random-user-token.dto'
import { UsersService } from '../users/users.service'
import { ConfigService } from '@nestjs/config'
import * as twilio from 'twilio'
import { TwilioService } from 'nestjs-twilio'
import { UsersRepository } from '../users/users.respository'
import { JwtService } from '@nestjs/jwt'
import { MailService } from '../mail/mail.service'
import { cacheRepository } from '../../cache/cache.repository'
import userRolesUpdatedInterface from './interfaces/user-roles-updated.interface'

// @Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly twilioService: TwilioService,
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
    private readonly CacheRepository: cacheRepository // private readonly countryService: CountryService, // private readonly UserVerificationsDocumentsService: userVerificationsDocumentsService,
  ) {}

  //FRONTEND APIS
  // Sign up
  async signup(@Body() Signup: signupUserInterface) {
    const Email = await this.usersService.findUserByEmail(Signup.email)
    if (Email) {
      throw new ConflictException('This email already exists')
    }

    if (Signup.password !== Signup.confirmPassword) {
      throw new NotAcceptableException('Passwords do not match')
    }

    const isPasswordStrongEnough = Signup.password.match(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    )
    if (!isPasswordStrongEnough) {
      throw new BadRequestException('Password is too weak')
    }

    await this.usersService.createUser({
      ...Signup,
      password: await AuthService.hashPassword(Signup.password)
    })
    // const base64Data = user.image;
    // const base64image = base64Data.split(';base64,').pop();
    // const pdfBuffer = Buffer.from(base64image, 'base64');
    //
    // const savePath = path.join(
    //   __dirname,
    //   '../../../..',
    //   '/asset/',
    //   `${user.firstName}-${user.lastName}.png`
    // );
    // fs.writeFileSync(savePath, pdfBuffer);
    //
    // const Otp =generateRandomOtp(6)
    // const OtpKey = `Otp-token:${user.email}`;
    // const OtpValue = JSON.stringify({ token: Otp, active: false, });
    // await this.CacheRepository.Cacheset(OtpKey, OtpValue, { ttl: Otpexpires });
    // console.log(Otp)
    // const adminEmail=this.configService.get("ADMIN_EMAIL")
    // const template = handlebars.compile(fs.readFileSync('src/templates/adminEmail.html', 'utf8'),);
    // const emailBody = template({adminEmail , name: user.firstName, userEmail: user.email});
    // const mailData: any = {
    //   to: adminEmail,
    //   from: process.env.MAIL_FROM,
    //   subject: "New Signup",
    //   content: "Process is completed successfully",
    //   cc: "",
    //   bcc: "",
    //   template: emailBody
    // };
    //
    //   this.mailService.sendMail(mailData);
    //   await  this.sendOtp(user.phoneNo,Otp)
    return { message: 'Successfully Sign Up!' }
  }

  //login
  async login(user: User): Promise<JwtTokensInterface> {
    const result = await this.usersService.findUserById(user.id)
    console.log('result<<<<<<<', result)
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNo: user.phoneNo,
      imag: user.image,
      roles: user.roles
    }

    const accessTokenRedis = this.jwtService.sign(payload)
    const expires = this.configService.get('TOKEN_EXPIRY')
    await this.CacheRepository.Cacheset(accessTokenRedis, user, {
      ttl: expires
    })
    return {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      phone_no: user.phoneNo,
      email: user.email,
      image: user.image,
      roles: user.roles,
      access_token: accessTokenRedis
    }
  }

  //get user by id
  async findUserById(userId: string): Promise<User> {
    return await this.usersService.findUserById(userId)
  }

  // get data from google ( signup)
  async googleLogin(req: any) {
    if (!req.user) {
      return { message: 'No user from Google', user: null, access_token: null }
    }
    const user = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNo: req.user.phoneNo,
      imag: req.user.image,
      password: req.user.password,
      roles: req.user.roles
    }
    const accessToken = this.jwtService.sign(user)
    const expires = this.configService.get('TOKEN_EXPIRY')
    await this.CacheRepository.Cacheset(accessToken, user, { ttl: expires })
    return { access_token: accessToken }
    //return  req.user;
  }

  // sign up with google
  async saveUserToDatabase(userData: any): Promise<User> {
    const email = await this.usersService.findUserByEmail(userData.email)
    if (email) {
      throw new UnauthorizedException('Email is already in use')
    }
    const user = new User()
    user.firstName = userData.name
    user.lastName = userData.username
    user.email = userData.email
    user.phoneNo = userData.phone_no
    user.image = userData.image
    user.email = userData.email
    user.password = userData.password
    user.roles = userData.roles
    return await this.usersRepository.createUser(user)
  }

  // get all users
  async getAllUser(): Promise<User[]> {
    const users = await this.usersService.getAllUser()
    if (!users) {
      throw new NotFoundException('No user exit')
    }
    return users
  }

  // profile get
  async getProfile(accessToken: string) {
    const cachedToken = await this.CacheRepository.Cacheget(accessToken)
    if (!cachedToken) {
      throw new UnauthorizedException('Token expired')
    }
    return cachedToken
  }

  // refresh token
  async refreshToken(user: User, accessToken: string) {
    const cachedToken = await this.CacheRepository.Cacheget(accessToken)
    if (!cachedToken || cachedToken) {
      await this.CacheRepository.Cachedel(accessToken)
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
        email: user.email,
        password: user.password,
        imag: user.image,
        roles: user.roles
      }
      const accessTokenRedis = this.jwtService.sign(payload)
      const expires = this.configService.get('TOKEN_EXPIRY')
      await this.CacheRepository.Cacheset(accessTokenRedis, user, {
        ttl: expires
      })
      return { refresh_token: accessTokenRedis }
    }
  }

  //logout
  async logout(accessToken: string): Promise<{ message: string }> {
    const cachedToken = await this.CacheRepository.Cacheget(accessToken)
    if (!cachedToken) {
      throw new NotFoundException('Token expired')
    }
    await this.CacheRepository.Cachedel(accessToken)
    return { message: 'Successfully logout' }
  }

  //email (token)
  async token(randomUserToken: randomUserTokenInterface) {
    const user = await this.usersService.findUserByEmail(randomUserToken.email)
    if (!user) {
      throw new NotFoundException('Invalid email')
    }
    const Username = user.firstName
    const resetToken = generateRandomToken(32)
    const expires = this.configService.get('TOKEN_EXPIRY')
    const tokenKey = `forgot-password-token:${user.email}`
    const tokenValue = JSON.stringify({ token: resetToken, active: false })
    const logo_rentACar = process.env.LOGO_rentACar
    const contact_us_url = process.env.CONTACT_US
    const privacy_policy_url = process.env.PRIVACY_POLICY
    await this.CacheRepository.Cacheset(tokenKey, tokenValue, { ttl: expires })
    const FRONTEND_APP_URL = process.env.FRONTEND_APP_URL
    const changePasswordUrl = `${FRONTEND_APP_URL}/change-password/#/Auth/AuthController_changePasswordToken`
    console.log('token', resetToken)
    const queryParams = `?resetToken=${resetToken}&email=${user.email}`
    const resetUrl = `${changePasswordUrl}${queryParams}`
    const template = handlebars.compile(fs.readFileSync('src/templates/resetPassword.html', 'utf8'))
    const emailBody = template({
      resetUrl,
      username: Username,
      contact_us_url,
      privacy_policy_url,
      logo_rentACar
    })
    const mailData: any = {
      to: user.email,
      from: process.env.MAIL_FROM,
      subject: 'Need a Reset?',
      content: 'Process is completed successfully',
      cc: '',
      bcc: '',
      template: emailBody
    }
    this.mailService.sendMail(mailData)
    return {
      message: 'Please check your email to reset your password!',
      tokenStatus: true
    }
  }

  //change user password token verification
  async tokenVerification(
    email: string,
    @Body() reqBody: changeUserPasswordTokenVerificationInterface
  ) {
    const user = await this.usersService.findUserByEmail(email)
    if (!user) {
      throw new NotFoundException('Invalid email')
    }
    const tokenKey = `forgot-password-token:${user.email}`
    const cachedToken = await this.CacheRepository.Cacheget(tokenKey)
    if (!cachedToken) {
      throw new UnauthorizedException('token expired')
    }
    const parsedToken = JSON.parse(<string>cachedToken)
    if (parsedToken.token !== reqBody.token) {
      throw new UnauthorizedException('Invalid token')
    } else {
      parsedToken.active = true
      const updatedTokenValue = JSON.stringify(parsedToken)
      await this.CacheRepository.Cacheset(tokenKey, updatedTokenValue, {
        ttl: 5400
      })
    }
    return {
      statusCode: 200,
      message: 'Token is active and valid',
      tokenStatus: true
    }
  }

  // change password
  async changePassword(email: string, @Body() reqBody: changeUserPasswordInterface) {
    const logo_rentACar = process.env.LOGO_rentACar
    const contact_us_url = process.env.CONTACT_US
    const privacy_policy_url = process.env.PRIVACY_POLICY
    const user = await this.usersService.findUserByEmail(email)
    if (!user) {
      throw new NotFoundException('Invalid email')
    }

    const tokenKey = `forgot-password-token:${user.email}`
    const cachedToken = await this.CacheRepository.Cacheget(tokenKey)
    if (!cachedToken) {
      throw new UnauthorizedException('token expired')
    }

    const parsedToken = JSON.parse(<string>cachedToken)
    console.log(cachedToken)
    if (parsedToken.token !== reqBody.token) {
      throw new UnauthorizedException('Invalid token')
    }

    if (reqBody.newPassword !== reqBody.confirmPassword) {
      throw new NotAcceptableException('Passwords do not match')
    }

    const isPasswordStrongEnough = reqBody.newPassword.match(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    )
    if (!isPasswordStrongEnough) {
      throw new BadRequestException('Password is too weak')
    }

    const hashedPassword = await AuthService.hashPassword(reqBody.newPassword)
    const template = handlebars.compile(
      fs.readFileSync('src/templates/updatePassword.html', 'utf8')
    )
    const emailBody = template({
      email,
      username: user.firstName,
      contact_us_url,
      privacy_policy_url,
      logo_rentACar
    })
    const mailData: any = {
      to: user.email,
      from: process.env.MAIL_FROM,
      subject: 'Success: Your password has been reset!',
      content: 'Process is completed successfully',
      cc: '',
      bcc: '',
      template: emailBody
    }
    if (parsedToken.active == true) {
      await this.usersService.updatePassword(email, hashedPassword)
      this.mailService.sendMail(mailData)
      const loginResult = this.login(user)
      await this.CacheRepository.Cachedel(tokenKey)
      return loginResult
    } else {
      throw new UnauthorizedException('plz firstly active token and then  password changed')
    }
  }

  // Generating hashed password
  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(password, salt)
  }

  // send Otp
  async sendOtp(phone_no: any, Otp: any) {
    const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    try {
      await twilioClient.messages.create({
        to: phone_no,
        from: process.env.TWILIO_PHONE_NUMBER,
        body: `Your verification OTP is: ${Otp}`
      })
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to send OTP')
    }
  }

  //used for validation purpose
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email)
    if (!user) {
      throw new NotFoundException('Invalid email')
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new NotFoundException('Invalid password')
    }

    return user
  }

  // user roles  updated ( renter ,customer)
  async rolesActive(userId: string, @Body() reqBody: userRolesUpdatedInterface): Promise<User> {
    const result = await this.usersService.rolesActive(userId, reqBody.roles)
    return result
  }

  //apple
  // async registerByIDtoken(payload: any)
  // {
  //   if(payload.hasOwnProperty('id_token')){
  //
  //     let email, firstName, lastName = '';
  //
  //     //You can decode the id_token which returned from Apple,
  //     const decodedObj = await this.jwtService.decode(payload.id_token);
  //     const accountId = decodedObj.sub || '';
  //     console.info(`Apple Account ID: ${accountId}`);
  //
  //     //Email address
  //     if (decodedObj.hasOwnProperty('email'))
  //     {
  //       email = decodedObj['email'];
  //       console.info(`Apple Email: ${email}`);
  //     }
  //
  //     //You can also extract the firstName and lastName from the user, but they are only shown in the first time.
  //     if (payload.hasOwnProperty('user')) {
  //       const userData = JSON.parse(payload.user);
  //       const { firstName, lastName } = userData.name || {};
  //     }
  //
  //     //.... you logic for registration and login here
  //
  //   }
  //   throw new UnauthorizedException('Unauthorized');
  // }
  //
  //
}
