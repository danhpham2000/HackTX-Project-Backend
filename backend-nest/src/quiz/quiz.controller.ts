import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async generateQuiz(
    @Body('subject') subject: string,
    @Body('numOfQuestions') numOfQuestions: number,
  ) {
    return await this.quizService.generateQuiz(subject, numOfQuestions);
  }
}
