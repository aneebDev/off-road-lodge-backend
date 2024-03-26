import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IsEnum, IsLatitude, IsLongitude } from 'class-validator'

export enum atvTypes {
  HONDA = 'HONDA',
  YAMAHA = 'YAMAHA',
  FORD = 'FORD',
}

@Entity('atvs')
export class Atv {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ type: 'enum', enum: atvTypes})
  @IsEnum(atvTypes)
  atv: string

  @ApiProperty()
  @Column({ type: 'text' })
  title: string

  @ApiProperty()
  @Column({ type: 'text' })
  riderAge: string

  @ApiProperty()
  @Column({ type: 'text' })
  atvExperience: string

  @ApiProperty()
  @Column({ type: 'text' })
  passengers: string
  @ApiProperty()
  @Column({ type: 'text' })
  description: string
  @ApiProperty()
  @Column({ type: 'text' })
  damageDeposit: string

  @ApiProperty()
  @Column({ type: Boolean})
  refundable: boolean
  @ApiProperty()
  @Column({ type: 'text' })
  extraServices: string

  @ApiProperty()
  @Column({ type: 'text' })
  url: string

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
  city: string

  @ApiProperty()
  @Column({ type: 'text' })
  price: string

  @ApiProperty()
  @Column({ type: 'text' })
  accommodationTax: string

  @ApiProperty()
  @Column({ type: 'text' })
  atvSeats: string

  @ApiProperty()
  @Column({ type: 'text', array: true, nullable: false })
  imageUrls: string[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
