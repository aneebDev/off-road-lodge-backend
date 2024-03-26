import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsString } from 'class-validator'
import { atvTypes } from '../entities/atv.entity'

export class CreateAtvDto {
  @ApiProperty()
  @IsEnum(atvTypes)
  atv: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  riderAge: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  atvExperience: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passengers: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  damageDeposit: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refundable: boolean

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  extraServices: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string

  @ApiProperty()
  @IsLatitude()
  latitude: number

  @ApiProperty()
  @IsLongitude()
  longitude: number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accommodationTax: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  atvSeats: string

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  imageUrls: string[]
}
