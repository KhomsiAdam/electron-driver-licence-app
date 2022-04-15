import { useState, useEffect, useContext } from 'react';
import QuizContainer from '../components/QuizContainer';
import Overlay from '../components/Overlay';
import QuizContext from '../context/QuizScoreContext';
import ScoreCard from '../components/ScoreCard';
import QuizCard from '../components/QuizCard';

const apiUrl = 'http://localhost:4000/api';

export interface Iquiz {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  type: string;
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const {
    totalScore,
    resetScore,
    tries,
    setTries,
    endQuiz,
    setEndQuiz,
    currentQuizInd,
    setCurrentQuizInd,
    setQuizzes,
  } = useContext(QuizContext);

  const fetchQuiz = async () => {
    setTries(tries - 1);
    resetScore();
    setIsLoaded(false);
    setEndQuiz(false);
    const response = await fetch(`${apiUrl}/quiz`);
    const res = await response.json();
    setQuizzes(res);
    setIsLoaded(true);
    setCurrentQuizInd(0);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  return (
    <>
      {endQuiz && <Overlay restartQuiz={fetchQuiz} />}
      {isLoaded ? (
        <>
          {type === '' ? (
            <>
              <div className='mb-8 text-2xl font-bold text-center text-primary-500'>
                Pick a Driver Licence type:
              </div>
              <div className='grid grid-cols-4 mx-auto place-content-center w-fit'>
                <button
                  className='h-[150px] w-[150px] border-white border-8 bg-gray-100 hover:bg-secondary-200 rounded-full outline-dashed outline-secondary-500 hover:scale-110 transition-all shadow-xl mx-4'
                  value='A'
                  onClick={(e: any) => setType(e.target.value)}
                >
                  <img src='assets/images/bike.png' alt='Driver Licence A' />
                </button>
                <button
                  className='h-[150px] w-[150px] border-white border-8 bg-gray-100 hover:bg-secondary-200 rounded-full outline-dashed outline-secondary-500 hover:scale-110 transition-all shadow-xl mx-4'
                  value='B'
                  onClick={(e: any) => setType(e.target.value)}
                >
                  <img src='assets/images/car.png' alt='Driver Licence B' />
                </button>
                <button
                  className='h-[150px] w-[150px] border-white border-8 bg-gray-100 hover:bg-secondary-200 rounded-full outline-dashed outline-secondary-500 hover:scale-110 transition-all shadow-xl mx-4'
                  value='C'
                  onClick={(e: any) => setType(e.target.value)}
                >
                  <img src='assets/images/truck.png' alt='Driver Licence C' />
                </button>
                <button
                  className='h-[150px] w-[150px] border-white border-8 bg-gray-100 hover:bg-secondary-200 rounded-full outline-dashed outline-secondary-500 hover:scale-110 transition-all shadow-xl mx-4'
                  value='D'
                  onClick={(e: any) => setType(e.target.value)}
                >
                  <img src='assets/images/bus.png' alt='Driver Licence D' />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* <QuizContainer quizzes={quizzes} type={type} /> */}
              <ScoreCard />
              <QuizCard
                // quiz={quizzes[currentQuizInd]}
                // quizzes={quizzes}
                currentQuiz={currentQuizInd}
                type={type}
              />
            </>
          )}
        </>
      ) : (
        <div className='grid place-content-center'>
          <svg
            role='status'
            className='w-24 h-24 mr-2 text-secondary-500 animate-spin fill-primary-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            ></path>
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            ></path>
          </svg>
        </div>
      )}
    </>
  );
}
