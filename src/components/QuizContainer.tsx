import ScoreCard from "./ScoreCard";
import QuizCard from "./QuizCard";
import { useContext, useEffect, useState } from "react";
import { Iquiz } from "../pages/Home";
import QuizContext from "../context/QuizScoreContext";

interface IProps {
  quizess: Iquiz[];
  setEndQuiz: (isOver: boolean) => void;
  currentQuizInd: number;
  setCurrentQuizInd: (prev: any) => void;
  counter: number;
  setCounter: (prev: any) => void;
}

export default function QuizContainer({
  quizess,
  setEndQuiz,
  currentQuizInd,
  setCurrentQuizInd,
}: IProps) {
  const { totalScore } = useContext(QuizContext);
  const [counter, setCounter] = useState<number>(10);
  const changeQuiz = () => {
    if (currentQuizInd < quizess.length - 1) {
      setCurrentQuizInd((n: number) => n + 1);
      setCounter(10);
    } else if (currentQuizInd === quizess.length - 1) {
      setEndQuiz(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    //timer for each quiz with
    const interval = setInterval(() => {
      if (currentQuizInd < quizess.length - 1) {
        setCounter(counter - 1);
      } else {
        return;
      }
    }, 1000);
    if (currentQuizInd === quizess.length - 1) {
      setEndQuiz(true);
    } else if (counter === 0) {
      setCounter(10);
      setCurrentQuizInd((n: number) => n + 1);
    }

    return () => {
      clearInterval(interval);
    };
  });

    return (
      <>
          <ScoreCard
            currentQuiz={currentQuizInd}
            totalScore={totalScore}
            quizzes={quizess}
            counter={counter}
            setCounter={setCounter} />
          <QuizCard
            key={Math.random()}
            quiz={quizess[currentQuizInd]}
            changeQuiz={changeQuiz}
            currentQuiz={currentQuizInd} />
      
      </>
    );
  
}
