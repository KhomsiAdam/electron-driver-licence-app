import { FC } from 'react';
import { QuizProvider } from './context/QuizScoreContext';
import './index.css';
import Home from './pages/Home';

const App: FC = () => {
  return (
    <main className='flex flex-col justify-center h-screen'>
      <QuizProvider>
        <Home />
      </QuizProvider>
    </main>
  );
};

export default App;
