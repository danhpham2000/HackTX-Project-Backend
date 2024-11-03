import { AuthEntity } from 'src/auth/auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class QuizEntity {
  @PrimaryGeneratedColumn()
  quizId: number;

  @Column()
  name: string;

  @Column()
  numQuestions: number;

  @Column()
  quizCompleted: boolean;

  @Column()
  grade: number;

  @ManyToOne(() => AuthEntity)
  @JoinColumn()
  user: AuthEntity;
}
