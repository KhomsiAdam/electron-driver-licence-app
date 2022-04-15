import { Iquiz } from '../pages/Home';
import { useContext, useEffect, useState } from 'react';
import QuizContext from '../context/QuizScoreContext';
import CrossProcessExports from 'electron';

interface Iprops {
  quiz: Iquiz;
  key: any;
  changeQuiz: () => void;
  currentQuiz: number;
  type: string;
}

export default function QuizCard(data: Iprops) {
  const { updateScore } = useContext(QuizContext);

  const options = [...data.quiz.incorrectAnswers, data.quiz.correctAnswer];
  // .sort(
  //   () => Math.random() - 0.5
  // );

  const handleClick = (evt: any) => {
    data.changeQuiz();
    updateScore(evt.target.value === data.quiz.correctAnswer);
  };

  return (
    <>
      <div className='container grid w-full gap-8 p-6 mx-auto my-16'>
        <p className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
          Type: {data.type}
        </p>
        <p className='text-lg font-medium text-center text-gray-700 select-none'>
          {`${data?.currentQuiz + 1} / 40`}
        </p>
        <p className='text-2xl font-bold text-center text-gray-800 select-none'>
          {data?.quiz?.question}
        </p>
        <div className='grid gap-8 mt-4 options'>
          {options &&
            options.map((opt, i: number) => {
              return (
                <button
                  key={i}
                  className='py-3 text-base font-normal text-gray-800 select-none btn-secondary hover:font-bold'
                  value={opt}
                  onClick={handleClick}
                >
                  {opt}
                </button>
              );
            })}
        </div>
        <div className='flex justify-end my-3'>
          <button
            className='w-40 py-3 select-none btn-primary'
            onClick={() => data.changeQuiz()}
          >
            Skip
          </button>
        </div>
      </div>
    </>
  );
}
