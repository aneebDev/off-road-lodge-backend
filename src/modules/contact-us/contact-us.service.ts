import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { ContactUsRepository } from './contact-us.repository'
import { ContactUs } from './entities/contact-us.entity'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'
import { FindOptionsOrder } from 'typeorm/find-options/FindOptionsOrder'
import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect'
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Injectable()
export class ContactUsService {

  constructor(
    private contactUsRepository: ContactUsRepository,
  ) {}
  // create ContactUs
  create(createContactUsDto: CreateContactUsDto): Promise<ContactUs> {
    return this.contactUsRepository.create(createContactUsDto);
  }

  // get all ContactUs
  findAll(
    whereCondition:
      | FindOptionsWhere<ContactUs>[]
      | FindOptionsWhere<ContactUs> = undefined,
    relationShips: string[] = [],
    order: FindOptionsOrder<ContactUs> = {},
    select: FindOptionsSelect<ContactUs> = {},
  ) {
    return this.contactUsRepository.findAll(
      whereCondition,
      relationShips,
      order,
      select,
    );
  }
  async findBy(whereCondition) {
    return await this.contactUsRepository.findOneById(whereCondition);
  }

  // get one ContactUs by id
  findOneById(id: string, relationShips: string[] = []) {
    return this.contactUsRepository.findOneById({ id }, relationShips);
  }

  update(id: string, updateContactUsDto: UpdateContactUsDto) {
    return this.contactUsRepository.update(id, updateContactUsDto);
  }

  // async update(whereCondition, updateContactUsDto: UpdateContactUsDto): Promise<ContactUs> {
  //   const contactUs = await this.contactUsRepository.findOneById(whereCondition);
  //   if (!contactUs) {
  //     // Handle case when contactUs is not found
  //     return null;
  //   }
  //
  //   // Update contactUs with new data
  //   contactUs.email = updateContactUsDto.email;
  //   contactUs.first_name = updateContactUsDto.first_name;
  //   contactUs.last_name = updateContactUsDto.last_name;
  //   contactUs.message = updateContactUsDto.message;
  //   contactUs.phone = updateContactUsDto.phone;
  //   // Update other properties as needed
  //
  //   // Save updated contactUs
  //   return await this.contactUsRepository.save(contactUs);
  // }

  delete(
    whereCondition:
      | FindOptionsWhere<ContactUs>[]
      | FindOptionsWhere<ContactUs> = undefined,
  ) {
    return this.contactUsRepository.delete(whereCondition);
  }

}
