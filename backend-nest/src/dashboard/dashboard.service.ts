import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/auth.entity';
import { QuizEntity } from 'src/quiz/quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
  ) {}

  async getQuizSummaryByUserId(userId: number): Promise<any[]> {
    // Fetch quizzes for the user
    const quizzes = await this.quizRepository.find({
      where: { user: { userId: userId } }, // Assuming you have a relation to user
      relations: ['user'], // If you want to load user data as well
    });

    // Map to summary structure
    return quizzes.map((quiz) => ({
      quizId: quiz.quizId,
      name: quiz.name,
      numQuestions: quiz.numQuestions,
      quizCompleted: quiz.quizCompleted,
      grade: quiz.grade,
    }));
  }
}
