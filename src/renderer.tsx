import App from './App';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QuizProvider } from './context/QuizScoreContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as Element);

root.render(
  <HashRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </HashRouter>
);
