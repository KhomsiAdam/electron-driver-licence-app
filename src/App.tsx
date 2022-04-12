import { FC } from 'react';
import { QuizProvider } from './context/QuizScoreContext';
import './index.css';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <main className='h-screen bg-lightBlue'>
      <QuizProvider>
        <Home />
      </QuizProvider>
    </main>
  );
};

export default App;
