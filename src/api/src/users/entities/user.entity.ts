import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;
  @Column({ length: 500, unique: true })
  username: string;
  @Column({ length: 500 })
  password: string;
  @Column({ type: 'date' })
  dateofbirth: Date;
}
