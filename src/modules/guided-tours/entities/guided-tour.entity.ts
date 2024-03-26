import { ApiProperty } from '@nestjs/swagger'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IsLatitude, IsLongitude } from 'class-validator'

@Entity('guidedtours')
export class GuidedTour {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({ type: 'text' })
  title: string
  @ApiProperty()
  @Column({ type: 'text' })
  duration: string
  @ApiProperty()
  @Column({ type: 'text' })
  startLocation: string
  @ApiProperty()
  @Column({ type: 'text' })
  cost: string
  @ApiProperty()
  @Column()
  people: number
  @ApiProperty()
  @Column({ type: Boolean})
  group: boolean
  @ApiProperty()
  @Column({ type: 'text' })
  description: string

  @ApiProperty()
  @Column({ type: 'double precision' }) // Double precision is often used for latitude and longitude
  @IsLatitude()
  latitude: number

  @ApiProperty()
  @Column({ type: 'double precision' }) // Double precision is often used for latitude and longitude
  @IsLongitude()
  longitude: number

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
