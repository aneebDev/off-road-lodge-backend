import { userPost } from '../entities/post.entity'
export default interface paginationInterface {
  records: userPost[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}
