import { Module } from '@nestjs/common'
import { AtvService } from './atv.service'
import { AtvController } from './atv.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Atv } from './entities/atv.entity'
import { AtvRepository } from './atv.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Atv])],
  controllers: [AtvController],
  providers: [AtvService, AtvRepository]
})
export class AtvModule {}
