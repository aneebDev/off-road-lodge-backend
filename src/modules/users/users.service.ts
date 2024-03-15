import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './schemas/user.schema'
import { UsersRepository } from './users.respository'
import * as uuid from 'uuid'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findUserByEmail(email)
  }

  // create User
  async createUser(user: CreateUserDto): Promise<User | null> {
    return this.usersRepository.createUser(user)
  }

  // get user by id   ( with relation)
  async findUserById(id: string): Promise<User | null> {
    return await this.usersRepository.findUserById(id)
  }

  // get user by id
  async getUserById(id: string): Promise<User | null> {
    if (!uuid.validate(id)) {
      throw new NotFoundException('Invalid UUID Format')
    }
    const user = await this.usersRepository.getUserById(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user
  }

  // get all users
  async getAllUser(): Promise<User[] | null> {
    const users = await this.usersRepository.getAllUser()
    if (!users) {
      throw new NotFoundException('No user exit')
    }
    return users
  }

  // // user update ( otp active status)
  //  async isOtpActive(email: string,otp_status:string): Promise<User | null>
  //  {
  //       return this.usersRepository.isOtpActive(email,otp_status);
  //  }

  //  update password
  async updatePassword(email: string, password: string): Promise<User | null> {
    return this.usersRepository.updatePassword(email, password)
  }

  // find user by  first name
  async findUserByFirstName(firstname: string): Promise<User | null> {
    return this.usersRepository.findUserByFirstName(firstname)
  }

  // user roles  updated ( renter ,customer)
  async rolesActive(userId: string, roles: string): Promise<User> {
    return this.usersRepository.rolesActive(userId, roles)
  }
}
