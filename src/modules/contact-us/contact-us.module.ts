import { Module } from '@nestjs/common'
import { ContactUsService } from './contact-us.service'
import { ContactUsController } from './contact-us.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ContactUs } from './entities/contact-us.entity'
import { ContactUsRepository } from './contact-us.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ContactUs])],
  controllers: [ContactUsController],
  providers: [ContactUsService, ContactUsRepository]
})
export class ContactUsModule {}
