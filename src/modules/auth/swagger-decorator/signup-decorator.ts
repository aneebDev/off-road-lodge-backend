import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { SignUpUserDto } from '../dto/signup-user.dto'

export function SwaggerSignUp(): PropertyDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'User Signup',
      description: 'Allows users to sign up and create a new account.'
    }),
    ApiBody({ type: SignUpUserDto })
  )
}
