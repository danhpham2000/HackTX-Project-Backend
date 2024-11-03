import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parseAIResponse } from 'src/util/response';

@Injectable()
export class EvaluationService {
  constructor(private configService: ConfigService) {}

  async getEvaluationTest(topic: string) {
    try {
      const genAI = new GoogleGenerativeAI(
        this.configService.get<string>('GOOGLE_AI_STUDIO'),
      );
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
      });

      const prompt = `Generate 20 ${topic} questions for to along with 4 multiple choices (A, B, C, D) with answer with explanation`;

      const result = await model.generateContent([prompt]);
      const responseText = await result.response.text();
      console.log(responseText);

      const cleanResponse = parseAIResponse(responseText);

      return {
        cleanResponse: cleanResponse,
      };
    } catch (err) {
      return err;
    }
  }
}
