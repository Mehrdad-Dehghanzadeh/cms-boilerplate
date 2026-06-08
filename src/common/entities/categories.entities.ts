import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id

  @Column({ type: 'varchar', length: 100, unique: true })
  name

  @Index()
  @Column({ type: 'varchar', length: 100, unique: true })
  slot
}
