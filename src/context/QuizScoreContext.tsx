import React, { createContext, useEffect, useState } from 'react';

interface AppContextInterface {
  totalScore: number;
  Isclick: boolean;
  updateScore: (isCorrect: boolean) => void;
  resetScore: () => void;
  
}
const QuizContext = createContext<AppContextInterface>({
  totalScore: 0,
  updateScore: (isCorrect: boolean) => {},
  resetScore: () => { },
  Isclick: false,
});

export const QuizProvider = (props: any) => {
  const [totalScore, setTotalScore] = useState<number>(0);
  const [ Isclick , setIsclick] = useState<boolean>(false);
  const updateScore = (isCorrect: boolean) => {
    if (isCorrect) {
      setTotalScore((total: number) => total + 1);
    }
  };
  const resetScore = () => {
    setTotalScore(0);
    setIsclick(true);
  };
  
 

  return (
    <QuizContext.Provider value={{ totalScore, updateScore, resetScore ,Isclick }}>
      {props.children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
