import { useContext, useEffect, useState } from 'react';
import QuizContext from '../context/QuizScoreContext';
import { Iquiz } from '../pages/Home';
import ProgressBar from './ProgressBar';

export default function ScoreCard() {
  const { counter, setCounter, setEndQuiz, currentQuizInd, setCurrentQuizInd, quizzes } = useContext(QuizContext);

  useEffect(() => {
    //timer for each quiz with
    const interval = setInterval(() => {
      if (currentQuizInd < quizzes.length - 1) {
        setCounter(counter + 1);
      } else {
        return;
      }
    }, 1000);
    if (currentQuizInd === quizzes.length - 1) {
      setEndQuiz(true);
    } else if (counter === 11) {
      setCounter(0);
      setCurrentQuizInd((n: number) => n + 1);
    }

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return (
    <div className='container relative flex flex-col items-center p-6 mx-auto text-2xl score-card'>
      {/* <div className='my-2 font-bold text-center text-primary-500'>{counter}</div> */}
      <ProgressBar done={counter} />
    </div>
  );
}
