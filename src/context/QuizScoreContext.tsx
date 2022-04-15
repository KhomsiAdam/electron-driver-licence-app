import { createContext, useState } from 'react';

interface AppContextInterface {
  totalScore: number;
  updateScore: (isCorrect: boolean) => void;
  resetScore: () => void;
  tries: number;
  setTries: (n: number) => void;
}
const QuizContext = createContext<AppContextInterface>({
  totalScore: 0,
  updateScore: (isCorrect: boolean) => {},
  resetScore: () => {},
  tries: 2,
  setTries: () => {},
});

export const QuizProvider = (props: any) => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [tries, setTries] = useState<number>(2);
  
  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setTotalScore((total: number) => total + 1);
    }
  };
  const resetScore = () => {
    setTotalScore(0);
  };
  
  return (
    <QuizContext.Provider value={{ totalScore, updateScore, resetScore, tries, setTries }}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
