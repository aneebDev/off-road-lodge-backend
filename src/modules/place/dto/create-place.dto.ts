import { IsBoolean, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PlaceTypes, StayTypes } from '../entities/place.entity'

export class CreatePlaceDto {
  @ApiProperty()
  @IsEnum(PlaceTypes)
  place: string;

  @ApiProperty()
  @IsEnum(StayTypes)
  placeType: string;

  @ApiProperty()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stayType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  guests: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  bedroom: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  beds: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  bedSize: string[];

  @ApiProperty()
  @IsBoolean()
  bedroomLock: boolean;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  offering: string[];

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  imageUrls: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeDescription: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string;
}
