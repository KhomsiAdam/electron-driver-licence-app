import { useContext, useEffect, useState } from 'react';
import QuizContext from '../context/QuizScoreContext';

interface Iprops {
  currentQuiz: number;
}

export default function QuizCard(data: Iprops) {
  const {
    updateScore,
    setCounter,
    setEndQuiz,
    currentQuizInd,
    setCurrentQuizInd,
    quizzes,
    type,
  } = useContext(QuizContext);
  const [options, setOptions] = useState<any>();

  const quiz = quizzes[currentQuizInd];

  const changeQuiz = () => {
    if (currentQuizInd < quizzes.length - 1) {
      setCurrentQuizInd((n: number) => n + 1);
      setCounter(0);
    } else if (currentQuizInd === quizzes.length - 1) {
      setEndQuiz(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    setOptions(
      [...quiz.incorrectAnswers, quiz.correctAnswer].sort(
        () => Math.random() - 0.5
      )
    );
  }, [quiz, setOptions]);

  const handleClick = (evt: any) => {
    changeQuiz();
    updateScore(evt.target.value === quiz.correctAnswer);
  };

  return (
    <>
      <div className='container grid w-full gap-8 p-6 mx-auto my-16'>
        <p className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
          Type: {type}
        </p>
        <p className='text-lg font-medium text-center text-gray-700 select-none'>
          {`${data?.currentQuiz + 1} / 40`}
        </p>
        <p className='text-2xl font-bold text-center text-gray-800 select-none'>
          {quiz?.question}
        </p>
        <div className='grid gap-8 mt-4 options'>
          {options &&
            options.map((opt: any, i: number) => {
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
            onClick={() => changeQuiz()}
          >
            Skip
          </button>
        </div>
      </div>
    </>
  );
}
