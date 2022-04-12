export interface Quiz {
  category: 'A' | 'B' | 'C' | 'D';
  type: 'single' | 'multiple';
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
}
