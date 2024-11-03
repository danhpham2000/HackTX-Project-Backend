import { QuizEntity } from 'src/quiz/quiz.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => QuizEntity, (quiz) => quiz.user)
  quizzes: QuizEntity[];
}
