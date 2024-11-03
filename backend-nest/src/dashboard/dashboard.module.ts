import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { AuthModule } from 'src/auth/auth.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from 'src/quiz/quiz.entity';
import { AuthEntity } from 'src/auth/auth.entity';

@Module({
  imports: [
    AuthModule,
    QuizModule,
    TypeOrmModule.forFeature([AuthEntity, QuizEntity]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
