import React ,{ useState, useEffect, useContext } from 'react';
import QuizContainer from './components/quiz-container';
import Overlay from './overlay';
import QuizContext from './context/quiz-score.context';
import  electron ,{net} from 'electron';

const apiUrl = 'https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple';
export interface Iquiz {
  category: string;
  correct_answer: string;
  incorrect_answers: string []
  question: string;
  type: string;
}

export default function MainPage() {
  const [quizess, setQuizess] = useState<Iquiz []>([]);
  const [isLoaded, setIsLoaded]= useState<boolean>(false);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  const [currentQuizInd, setCurrentQuizInd] = useState<number>(0);
  const { resetScore } = useContext(QuizContext)

   const fetchQuiz = async () => {
    resetScore();
    setIsLoaded(false);
    setEndQuiz(false);
    const response = await fetch(apiUrl);
    const res = await response.json();
    setQuizess(res.results);
    setIsLoaded(true);
    setCurrentQuizInd(0)
  }
  useEffect(() => {
   fetchQuiz()
  },[])
  return (
    <>
       {endQuiz && <Overlay resartQuiz={fetchQuiz} />}
       <div className='container mx-auto md:px-16 px-4'>
        {
          isLoaded ? (
             <div>
               <QuizContainer 
                 quizess={quizess}
                 setCurrentQuizInd={setCurrentQuizInd}
                 currentQuizInd={currentQuizInd}
                 setEndQuiz={setEndQuiz}
               />
             </div>
          ) : (
            <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
	<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
	<h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
	<p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
</div>

          )
        }
       </div>
     
    </>
    
  )
}