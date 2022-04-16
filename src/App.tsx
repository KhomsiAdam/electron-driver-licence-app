import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App: FC = () => {
  return (
    <main className='flex flex-col justify-center h-screen select-none'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </main>
  );
};

export default App;
