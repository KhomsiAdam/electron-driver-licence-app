import { useEffect, useState } from 'react';
import { Iquiz } from '../pages/Home';
import ProgressBar from './ProgressBar';

interface IProps {
  totalScore: number;
  currentQuiz: number;
  quizzes: Iquiz[];
  counter: number;
  setCounter: (prev: any) => void;
}

export default function ScoreCard({
  totalScore,
  currentQuiz,
  quizzes,
  counter,
}: IProps) {
  const [quizess, setQuizess] = useState<Iquiz[]>([]);
  const [currentQuizInd, setCurrentQuizInd] = useState<number>(0);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);

  return (
    <div className='container relative flex flex-col items-center p-6 mx-auto text-2xl score-card'>
      <div className='my-2 font-bold text-center text-primary-500'>{counter}</div>
      <ProgressBar done={counter} />
    </div>
  );
}
