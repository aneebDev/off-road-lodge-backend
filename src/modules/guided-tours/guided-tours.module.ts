import { Module } from '@nestjs/common';
import { GuidedToursService } from './guided-tours.service';
import { GuidedToursController } from './guided-tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { GuidedTour } from './entities/guided-tour.entity'
import { GuidedToursRepository } from './guided-tours.repository'

@Module({
  imports: [TypeOrmModule.forFeature([GuidedTour])],
  controllers: [GuidedToursController],
  providers: [GuidedToursService, GuidedToursRepository],
})
export class GuidedToursModule {}
