import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 3 })
  role: number;

  @Column({ default: 'New user' })
  details: string;
}
