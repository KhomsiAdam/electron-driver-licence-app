import { useEffect ,useState } from 'react';
import { Iquiz } from '../pages/Home';
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
  counter
}: IProps) {

const [quizess, setQuizess] = useState<Iquiz[]>([]);
const [currentQuizInd, setCurrentQuizInd] = useState<number>(0);
const [endQuiz, setEndQuiz] = useState<boolean>(false);

 
  return (
    <div className='relative flex flex-col items-end text-2xl score-card'>
      <div className='my-2'>
        Timer: <span className='ml-4'>{counter}</span>{' '}
      </div>
      <div className='my-2'>
        Questions Left:{' '}
        <span className='ml-4'> {quizzes.length - (currentQuiz + 1)}</span>
      </div>
      <br />
    </div>
  );
}
function setTimer(arg0: number) {
  throw new Error('Function not implemented.');
}

