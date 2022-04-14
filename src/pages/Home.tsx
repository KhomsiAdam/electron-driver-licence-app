import { useState, useEffect, useContext } from 'react';
import QuizContainer from '../components/QuizContainer';
import Overlay from '../components/Overlay';
import QuizContext from '../context/QuizScoreContext';

const apiUrl = 'http://localhost:4000/api';

export interface Iquiz {
  category: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  type: string;


}

export default function Home() {
  const [quizess, setQuizess] = useState<Iquiz[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  const [currentQuizInd, setCurrentQuizInd] = useState<number>(0);
  const { resetScore } = useContext(QuizContext);
const [counter, setCounter] = useState<number>(10);

  const fetchQuiz = async () => {
    resetScore();
    setIsLoaded(false);
    setEndQuiz(false);
    const response = await fetch(`${apiUrl}/quiz`);
    const res = await response.json();
    setQuizess(res);
    setIsLoaded(true);
    setCurrentQuizInd(0);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  
 
   

  return (
    <>
      {endQuiz && <Overlay resartQuiz={fetchQuiz} />}
      
      <div className='container px-4 mx-auto md:px-16'>
        {isLoaded ? (
          <div>
            <QuizContainer
              quizess={quizess}
              setCurrentQuizInd={setCurrentQuizInd}
              currentQuizInd={currentQuizInd}
              setEndQuiz={setEndQuiz}
              counter={counter}
              setCounter={function (prev: any): void {
                throw new Error('Function not implemented.');
              } }            />
          </div>
        ) : (
          <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-700 opacity-75'>
            <div className='w-12 h-12 mb-4 ease-linear border-4 border-t-4 border-gray-200 rounded-full loader'></div>
            <h2 className='text-xl font-semibold text-center text-white'>
              Loading...
            </h2>
            <p className='w-1/3 text-center text-white'>
              This may take a few seconds, please don't close this page.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
