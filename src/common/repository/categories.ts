import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id

  @Column({ length: 100, unique: true })
  name

  @Column({ length: 100, unique: true })
  slot
}
