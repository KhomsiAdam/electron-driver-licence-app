import { Iquiz } from '../pages/Home';
import { useContext } from 'react';
import QuizContext from '../context/QuizScoreContext';

interface Iprops {
  quiz: Iquiz;
  key: any;
  changeQuiz: () => void;
  currentQuiz: number;
}

export default function QuizCard(data: Iprops) {
  const { updateScore } = useContext(QuizContext);
  const options = [...data.quiz.incorrectAnswers, data.quiz.correctAnswer];
    // .sort(
    // () => Math.random() - 0.5
  // );

  const handleClick = (evt: any) => {
    data.changeQuiz();
     
    updateScore(evt.target.value === data.quiz.correctAnswer);
  };
  return (
    <>
      <div className='w-full p-6 my-16 rounded-md shadow-lg card'>
        <p className='md:text:2xl'>
          {`Q.${data?.currentQuiz + 1} ${data?.quiz?.question}`}
        </p>
        <div className='grid grid-cols-2 gap-8 mt-4 options'>
          {options.map((opt, i: number) => {
            return (
              <button
                key={i}
                className='py-3 text-sm text-gray-100 translate-y-24 bg-gray-800 rounded-lg hover:bg-gray-600 hover:'
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
            className='w-40 py-4 text-gray-200 bg-red-400 rounded-md hover:bg-red-500'
            onClick={() => data.changeQuiz()}
          >
            SKIP
          </button>
        </div>
      </div>
    </>
  );
}
