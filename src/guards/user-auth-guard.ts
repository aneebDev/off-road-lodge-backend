import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../modules/users/users.service'
import { jwtConstants } from '../modules/auth/constants/constants'
import { CACHE_MANAGER } from '@nestjs/common/cache'
import { Cache } from 'cache-manager'

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly usersService: UsersService
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivateJwt = await super.canActivate(context)

    if (!canActivateJwt) {
      throw new UnauthorizedException('Invalid JWT token')
    }
    const { headers } = context.switchToHttp().getRequest()
    const accessToken = headers.authorization.split(' ')[1]
    const decoded = await this.jwtService.verify(accessToken, { secret: jwtConstants.secret })
    const user = await this.usersService.getUserById(decoded.id)
    if (!user) {
      throw new UnauthorizedException('Invalid user')
    }
    const cachedToken = await this.cacheManager.get(accessToken)
    if (!cachedToken) {
      throw new UnauthorizedException('Token expired')
    }
    headers.user = user
    return true
  }
}
