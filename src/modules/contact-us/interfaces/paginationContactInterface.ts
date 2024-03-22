import { ContactUs } from '../entities/contact-us.entity'
export default interface paginationContactInterface {
  records: ContactUs[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}
