import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, UpdateResult } from 'typeorm'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { ContactUs } from './entities/contact-us.entity'
import { CreateContactUsDto } from './dto/create-contact-us.dto'
import { UpdateContactUsDto } from './dto/update-contact-us.dto'

@Injectable()
export class ContactUsRepository {
  constructor(@InjectRepository(ContactUs) private contactUsModel: Repository<ContactUs>) {}

  // create subject
  async create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    return this.contactUsModel.save(createContactUsDto)
  }

  // get all subjects for User
  async findAll(
    whereCondition: FindOptionsWhere<ContactUs>[] | FindOptionsWhere<ContactUs> = null,
    relationShips: string[] = [],
    order: FindOptionsOrder<ContactUs> = {},
    select: FindOptionsSelect<ContactUs> = {}
  ): Promise<ContactUs[]> {
    return this.contactUsModel.find({
      where: whereCondition,
      relations: relationShips,
      order: order,
      select: select
    })
  }

  // get one subject by id for User
  async findOneById(
    whereCondition: FindOptionsWhere<ContactUs>[] | FindOptionsWhere<ContactUs> = undefined,
    relationships: string[] = []
  ): Promise<ContactUs | null> {
    return this.contactUsModel.findOne({
      where: whereCondition ? whereCondition : {},
      relations: relationships
    })
  }

  // ADMIN API
  //get all contactus users for Admin API
  async findAndCount(
    skip: number,
    take: number,
    email?: string,
  ): Promise<[ContactUs[], number]> {
    const whereConditions: any[] = [];
    if (email) {
      whereConditions.push({
        email: Like(`${email}%`),
      });
    }
    const [result, totalCount] = await this.contactUsModel.findAndCount({
      where: whereConditions,
      skip,
      take,
      order: { createdAt: 'DESC' },
    });

    return [result, totalCount];
  }


  async update(id: string, updateContactUsDto: UpdateContactUsDto): Promise<UpdateResult> {
    return await this.contactUsModel.update({ id }, updateContactUsDto)
  }

  async delete(
    whereCondition: FindOptionsWhere<ContactUs>[] | FindOptionsWhere<ContactUs> = undefined
  ): Promise<ContactUs | null> {
    const contact = await this.contactUsModel.findOne({ where: whereCondition })
    if (!contact) {
      return null
    }
    await this.contactUsModel.remove(contact)
    return contact
  }
}
