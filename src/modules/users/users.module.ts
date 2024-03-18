import { User } from './schemas/user.schema'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersRepository } from './users.respository'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
