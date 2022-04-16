import { useState, useEffect, useContext } from 'react';
import Overlay from '../components/Overlay';
import QuizContext from '../context/QuizScoreContext';
import ScoreCard from '../components/ScoreCard';
import QuizCard from '../components/QuizCard';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { apiUrl } from '../../constants';

export interface Iquiz {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  type: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const {
    resetScore,
    tries,
    setTries,
    endQuiz,
    setEndQuiz,
    currentQuizInd,
    setCurrentQuizInd,
    setQuizzes,
    setCounter,
    type,
    setType,
  } = useContext(QuizContext);

  const reset = () => {
    setType('');
    resetScore();
    setCurrentQuizInd(0);
    setEndQuiz(false);
    setCounter(0);
    navigate('/');
  };

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
              <button
                onClick={() => navigate('/dashboard')}
                className='absolute p-3 transition-colors rounded-full top-5 left-5 text-primary-500 hover:text-white hover:bg-primary-500'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
              </button>
              <div className='mb-24 text-2xl font-bold text-center text-primary-500'>
                Pick a Driver Licence type:
              </div>
              <div className='grid grid-cols-4 mx-auto place-content-center w-fit'>
                <button
                  className='bg-[url("assets/images/bike.png")] bg-no-repeat bg-center h-[200px] w-[200px] border-white border-8 bg-primary-100 hover:bg-primary-300 rounded-full outline-dashed outline-primary-400 hover:scale-110 transition-all shadow-xl mx-4'
                  value='A'
                  onClick={(e: any) => setType(e.target.value)}
                />
                <button
                  className='bg-[url("assets/images/car.png")] bg-no-repeat bg-center h-[200px] w-[200px] border-white border-8 bg-primary-100 hover:bg-primary-300 rounded-full outline-dashed outline-primary-400 hover:scale-110 transition-all shadow-xl mx-4'
                  value='B'
                  onClick={(e: any) => setType(e.target.value)}
                />
                <button
                  className='bg-[url("assets/images/truck.png")] bg-no-repeat bg-center h-[200px] w-[200px] border-white border-8 bg-primary-100 hover:bg-primary-300 rounded-full outline-dashed outline-primary-400 hover:scale-110 transition-all shadow-xl mx-4'
                  value='C'
                  onClick={(e: any) => setType(e.target.value)}
                />
                <button
                  className='bg-[url("assets/images/bus.png")] bg-no-repeat bg-center h-[200px] w-[200px] border-white border-8 bg-primary-100 hover:bg-primary-300 rounded-full outline-dashed outline-primary-400 hover:scale-110 transition-all shadow-xl mx-4'
                  value='D'
                  onClick={(e: any) => setType(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={reset}
                className='absolute p-3 transition-colors rounded-full top-5 left-5 text-primary-500 hover:text-white hover:bg-primary-500'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                  ></path>
                </svg>
              </button>
              <ScoreCard />
              <QuizCard currentQuiz={currentQuizInd} />
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}
