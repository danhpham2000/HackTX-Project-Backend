import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard) // Protect the route with the JWT guard
  @Get('quizzes')
  async getQuizzesSummary(@Req() req) {
    const userId = req.user.id; // Extract user ID from the request object
    const summary = await this.dashboardService.getQuizSummaryByUserId(userId);
    return summary; // Return the summary of quizzes for the authenticated user
  }
}
