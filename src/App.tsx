import { FC } from 'react'
import { QuizProvider } from './context/quiz-score.context';
import './index.css';
import MainPage from './main-page';

const App: FC = () => {
	return (
	<main className="h-screen bg-lightBlue">
    <QuizProvider>
      <MainPage/>
    </QuizProvider>
  </main>
	)
};

export default App;

