import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Delete,
  Put,
  Patch,
  Param,
  Req
} from '@nestjs/common'
import { SignUpUserDto } from './dto/signup-user.dto'
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from './guards/local-auth-guard'
import { JwtAuthGuard } from './guards/jwt-auth-guard'
import { ChangeUserPasswordDto } from './dto/change-user-password.dto'
import JwtTokensInterface from './interfaces/jwt-token.interface'
import { randomUserTokenDto } from './dto/random-user-token.dto'
import { User } from '../users/schemas/user.schema'
import { changeUserPasswordTokenVerificationDto } from './dto/change-user-password-token-verification.dto'
import AuthBearer from '../../decorators/auth-bearer.decorators'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google-auth-guard'
import { SwaggerGetUser } from './swagger-decorator/get-user-decorator'
import { SwaggerGetAllUsers } from './swagger-decorator/get-all-users-decorator'
import { userRolesUpdatedDto } from './dto/user-roles-updated.dto'
import { SwaggerLogin } from './swagger-decorator/login-decorator'
import { SwaggerSignUp } from './swagger-decorator/signup-decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign up
  @SwaggerSignUp()
  @Post('signup')
  async signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto)
  }

  // login
  @SwaggerLogin()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<JwtTokensInterface> {
    return this.authService.login(req.user)
  }

  //profile get
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@AuthBearer() accessToken: string) {
    return this.authService.getProfile(accessToken)
  }

  // sign up with Google
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    console.log(req.user)
    return
  }

  // get data from google ( signup)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req)
  }

  // get user by id
  @SwaggerGetUser()
  @Get('/:userId')
  // @UsePipes(ParseUUIDPipe)
  async findUserById(@Param('userId') userId: string): Promise<User> {
    return this.authService.findUserById(userId)
  }

  // get all users
  @SwaggerGetAllUsers()
  @Get('/users/:allUsers')
  async getAllUser(): Promise<User[]> {
    return this.authService.getAllUser()
  }

  // refresh token
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/refresh/token')
  async refreshToken(@Request() req, @AuthBearer() accessToken: string) {
    return this.authService.refreshToken(req.user, accessToken)
  }

  //logout
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@AuthBearer() accessToken: string): Promise<{ message: string }> {
    return this.authService.logout(accessToken)
  }

  //email (token)
  @ApiBody({ type: randomUserTokenDto })
  @Post('forgotPassword/token')
  async token(@Body() randomUserToken: randomUserTokenDto) {
    return this.authService.token(randomUserToken)
  }

  //change user password token verification
  @ApiBody({ type: changeUserPasswordTokenVerificationDto })
  @Put('changePassword/token_verification/:email')
  async tokenVerification(
    @Param('email') email: string,
    @Body() body: changeUserPasswordTokenVerificationDto
  ) {
    return this.authService.tokenVerification(email, body)
  }

  //change password
  @ApiBody({ type: ChangeUserPasswordDto })
  @Put('changePassword/:email')
  async changePassword(@Param('email') email: string, @Body() reqBody: ChangeUserPasswordDto) {
    return this.authService.changePassword(email, reqBody)
  }

  // user roles  updated ( renter ,customer)
  @ApiBody({ type: userRolesUpdatedDto })
  @Patch('user_roles/:userId')
  async rolesActive(
    @Param('userId') userId: string,
    @Body() body: userRolesUpdatedDto
  ): Promise<User> {
    return this.authService.rolesActive(userId, body)
  }

  // // apple
  //  @Get()
  //  @UseGuards(AuthGuard('apple'))
  //  async Login(): Promise<any>
  //  {
  //    return HttpStatus.OK;
  //  }
  //
  //
  //  @Post('/redirect')
  //  async redirect(@Body() payload): Promise<any>
  //  {
  //    if (payload.id_token)
  //    {
  //      return this.authService.registerByIDToken(payload);
  //    }
  //     throw new UnauthorizedException('Unauthorized');
  //  }
}
