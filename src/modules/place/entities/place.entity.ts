import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IsEnum, IsLatitude, IsLongitude } from 'class-validator'

export enum PlaceTypes {
  HOME = 'HOME',
  APARTMENT = 'APARTMENT',
  HOTEL = 'HOTEL',
  FARMHOUSE = 'FARMHOUSE',
  CABIN = 'CABIN',
  CONTAINER = 'CONTAINER',
  RV = 'RV'
}

export enum StayTypes {
  DEFAULT = 'An entire place. (Default)',
  ROOM = 'ROOM',
  SHARED = 'SHARED'
}

@Entity({ name: 'places' })
export class Place {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ type: 'enum', enum: PlaceTypes })
  @IsEnum(PlaceTypes)
  place: string

  @ApiProperty()
  @Column({ type: 'enum', enum: StayTypes })
  placeType: string

  @ApiProperty()
  @Column({ type: 'double precision' }) // Double precision is often used for latitude and longitude
  @IsLatitude()
  latitude: number

  @ApiProperty()
  @Column({ type: 'double precision' }) // Double precision is often used for latitude and longitude
  @IsLongitude()
  longitude: number

  @ApiProperty()
  @Column({ type: 'text' })
  country: string

  @ApiProperty()
  @Column({ type: 'text' })
  address: string

  @ApiProperty()
  @Column({ type: 'text' })
  stayType: string

  @ApiProperty()
  @Column({ type: 'text' })
  city: string

  @ApiProperty()
  @Column({ type: 'text' })
  url: string

  @ApiProperty()
  @Column({ type: 'text' })
  guests: string

  @ApiProperty()
  @Column({ type: 'text' })
  bedroom: string

  @ApiProperty()
  @Column({ type: 'text' })
  beds: string

  @ApiProperty()
  @Column({ type: 'text', array: true, nullable: false })
  bedSize: string[]

  @ApiProperty()
  @Column({ type: Boolean })
  bedroomLock: boolean

  @ApiProperty()
  @Column({ type: 'text', array: true, nullable: false })
  offering: string[]

  @ApiProperty()
  @Column({ type: 'text', array: true, nullable: false })
  imageUrls: string[]

  // // Method to convert array of image URLs to comma-separated string
  // setImageUrls(urls: string[]) {
  //   this.imageUrls = urls.join(',');
  // }
  //
  // // Method to parse comma-separated string back into array of image URLs
  // getImageUrls(): string[] {
  //   return this.imageUrls ? this.imageUrls.split(',') : [];
  // }

  @ApiProperty()
  @Column({ type: 'text' })
  placeTitle: string

  @ApiProperty()
  @Column({ type: 'text' })
  placeDescription: string

  @ApiProperty()
  @Column()
  price: string

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
