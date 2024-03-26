import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateGuidedTourDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  startLocation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cost: string;

  @ApiProperty()
  @IsNumber()
  people: number;

  @ApiProperty()
  @IsBoolean()
  group: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  imageUrls: string[];
}
