import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation } from '@nestjs/swagger'
import { LoginUserDto } from '../dto/login-user.dto'

export function SwaggerLogin(): PropertyDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'User Login',
      description: 'Allows users to log in to the application and obtain access token.'
    }),
    ApiBody({ type: LoginUserDto })
  )
}
