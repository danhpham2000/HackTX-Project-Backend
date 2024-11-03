import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  quizCompleted: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, default: 0 })
  averageScore: number;
}
