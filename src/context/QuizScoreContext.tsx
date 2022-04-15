import { createContext, useState } from 'react';
import { Iquiz } from '../pages/Home';

interface AppContextInterface {
  totalScore: number;
  updateScore: (isCorrect: boolean) => void;
  resetScore: () => void;
  tries: number;
  setTries: (n: number) => void;
  counter: number;
  setCounter: (n: number) => void;
  endQuiz: boolean;
  setEndQuiz: (isOver: boolean) => void;
  currentQuizInd: number;
  setCurrentQuizInd: (prev: any) => void;
  quizzes: Iquiz[];
  setQuizzes: (quizzes: Iquiz[]) => void;
  token: string;
  setToken: (token: string) => void;
}
const QuizContext = createContext<AppContextInterface>({
  totalScore: 0,
  updateScore: (isCorrect: boolean) => {},
  resetScore: () => {},
  tries: 2,
  setTries: () => {},
  counter: 0,
  setCounter: () => {},
  endQuiz: false,
  setEndQuiz: () => {},
  currentQuizInd: 0,
  setCurrentQuizInd: () => {},
  quizzes: [],
  setQuizzes: () => {},
  token: '',
  setToken: () => {},
});

export const QuizProvider = (props: any) => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [tries, setTries] = useState<number>(2);
  const [counter, setCounter] = useState<number>(0);
  const [endQuiz, setEndQuiz] = useState<boolean>(false);
  const [currentQuizInd, setCurrentQuizInd] = useState<number>(0);
  const [quizzes, setQuizzes] = useState<Iquiz[]>([]);
  // usestate for token
  const [token, setToken] = useState<string>('');

  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setTotalScore((total: number) => total + 1);
    }
  };
  const resetScore = () => {
    setTotalScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        totalScore,
        updateScore,
        resetScore,
        tries,
        setTries,
        counter,
        setCounter,
        endQuiz,
        setEndQuiz,
        currentQuizInd,
        setCurrentQuizInd,
        quizzes,
        setQuizzes,
        token,
        setToken,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
