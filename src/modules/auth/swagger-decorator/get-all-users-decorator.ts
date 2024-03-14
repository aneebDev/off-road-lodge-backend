import { applyDecorators } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

export function SwaggerGetAllUsers(): PropertyDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get list of users'
    })
  )
}
