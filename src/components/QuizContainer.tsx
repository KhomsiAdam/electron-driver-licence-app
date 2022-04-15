import ScoreCard from './ScoreCard';
import QuizCard from './QuizCard';
import { useContext, useEffect, useState } from 'react';
import { Iquiz } from '../pages/Home';
import QuizContext from '../context/QuizScoreContext';

interface IProps {
  quizzes: Iquiz[];
  type: string;
}

export default function QuizContainer({ type }: IProps) {
  const { currentQuizInd } = useContext(QuizContext);

  return (
    <>
      <ScoreCard />
      <QuizCard key={Math.random()} currentQuiz={currentQuizInd} type={type} />
    </>
  );
}
