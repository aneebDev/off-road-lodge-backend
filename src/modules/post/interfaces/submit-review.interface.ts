export default interface submitReviewInterface {
  readonly sellerId: string;
  readonly titleId: string;
  readonly message: string | null;
  readonly categoryId?: string | null;
  readonly approvedByAdmin: boolean;
  readonly bestWriter: boolean;
}
