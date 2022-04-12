import ScoreCard from './ScoreCard';
import QuizCard from './QuizCard';
import { useContext } from 'react';
import { Iquiz } from '../pages/Home';
import QuizContext from '../context/QuizScoreContext';

interface IProps {
  quizess: Iquiz[];
  setEndQuiz: (isOver: boolean) => void;
  currentQuizInd: number;
  setCurrentQuizInd: (prev: any) => void;
}

export default function QuizContainer({
  quizess,
  setEndQuiz,
  currentQuizInd,
  setCurrentQuizInd,
}: IProps) {
  const { totalScore } = useContext(QuizContext);
  const changeQuiz = () => {
    if (currentQuizInd < quizess.length - 1) {
      setCurrentQuizInd((n: number) => n + 1);
    } else if (currentQuizInd === quizess.length - 1) {
      setEndQuiz(true);
    } else {
      return;
    }
  };

  return (
    <>
      <ScoreCard
        currentQuiz={currentQuizInd}
        totalScore={totalScore}
        quizzes={quizess}
      />
      <QuizCard
        key={Math.random()}
        quiz={quizess[currentQuizInd]}
        changeQuiz={changeQuiz}
        currentQuiz={currentQuizInd}
      />
    </>
  );
}
