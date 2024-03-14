import { User } from './schemas/user.schema'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UsersRepository } from './users.respository'
// import { UserVerificationDocuments } from "../user-verifications-documents/schemas/userVerificationDocumets.schema";
// import { userVerifcationDocumentsRepository } from "../user-verifications-documents/user-verification-documents.repository";
// import { UsersDocumentRepository } from "../user-documents/user-document.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
