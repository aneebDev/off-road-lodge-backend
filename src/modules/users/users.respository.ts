import { Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './schemas/user.schema'
import { validateUuid } from '../../pipes/uuid.validator.pipe'

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  //FRONTEND APIS
  // create user
  async createUser(createUserDto: any) {
    return this.userModel.save(createUserDto)
  }

  // find user by email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } })
  }

  // // user update ( otp active status)
  // async isOtpActive(email: string, otp_status: string): Promise<User| null>
  // {
  //     const user = await this.userModel.findOne({ where: { email } });
  //     if (!user)
  //     {
  //       return null
  //     }
  //     user.otpStatus = otp_status;
  //     return this.userModel.save(user);
  // }

  // get user by id   ( with relation)
  async findUserById(id: string): Promise<User | null> {
    validateUuid([id])
    const user = await this.userModel.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    return user
  }

  // get user by id
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findOne({ where: { id } })
  }

  // get all users
  async getAllUser(): Promise<User[] | null> {
    return this.userModel.find({})
  }

  // find user by  first name
  async findUserByFirstName(firstName: string): Promise<User | null> {
    return this.userModel.findOne({ where: { firstName } })
  }

  // update password
  async updatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } })
    if (!user) {
      return null
    }
    user.password = password
    return this.userModel.save(user)
  }

  // user roles  updated ( renter ,customer)
  async rolesActive(userId: string, roles: string): Promise<User | null> {
    validateUuid([userId])
    const user = await this.userModel.findOne({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException('user not found')
    }
    user.roles = roles
    return this.userModel.save(user)
  }
}
