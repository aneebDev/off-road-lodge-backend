import { PartialType } from '@nestjs/swagger';
import { CreateAtvDto } from './create-atv.dto';

export class UpdateAtvDto extends PartialType(CreateAtvDto) {}
