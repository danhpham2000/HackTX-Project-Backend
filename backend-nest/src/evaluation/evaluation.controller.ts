import { Body, Controller, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async getEvaluationTest(@Body('topic') topic: string) {
    return this.evaluationService.getEvaluationTest(topic);
  }
}
