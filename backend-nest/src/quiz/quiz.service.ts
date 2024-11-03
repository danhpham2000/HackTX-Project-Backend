import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

@Injectable()
export class QuizService {
  private genAI: GoogleGenerativeAI;
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  private schema = {
    description: 'List of quiz questions and answers',
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        question: {
          type: SchemaType.STRING,
          description: 'The quiz question',
          nullable: false,
        },
        options: {
          type: SchemaType.ARRAY,
          description: 'Multiple choice options for the quiz question',
          items: {
            type: SchemaType.STRING,
          },
          nullable: false,
        },
        correctAnswer: {
          type: SchemaType.STRING,
          description: 'The correct answer for the quiz question',
          nullable: false,
        },
      },
      required: ['question', 'options', 'correctAnswer'],
    },
  };

  async generateQuiz(subject: string, numOfQuestions: number) {
    const prompt = `Generate ${numOfQuestions} questions with ${subject}.  Include options and the correct answer for each question.`;
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: this.schema,
        },
      });

      const result = await model.generateContent(prompt);
      const quizzes = result.response.text();
      return quizzes;
    } catch (err) {
      return err;
    }
  }
}
