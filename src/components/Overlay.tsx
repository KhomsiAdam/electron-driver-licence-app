import { useContext } from 'react';
import QuizContext from '../context/QuizScoreContext';

export default function Overlay({ resartQuiz }: { resartQuiz: () => void }) {
  const { totalScore } = useContext(QuizContext);
  return (
    <div className='fixed z-40 flex items-center justify-center w-screen h-screen px-4 text-xl text-gray-100 bg-black bg-opacity-90 bg-blend-overlay md:text-3xl'>
      <div className='flex flex-col gap-16'>
        <div className='grid grid-cols-2 gap-4 md:gap-16'>
          <div> Your Score :</div>
          <div>{totalScore}</div>
        </div>

        <div className='grid grid-cols-2 gap-4 md:gap-16'>
          <div> Correct Answers:</div>
          <div> {totalScore} </div>
        </div>

        <button
          onClick={resartQuiz}
          className='w-full py-4 text-gray-900 bg-green-200 rounded-xl'
        >
          Restart
        </button>
      </div>
    </div>
  );
}
