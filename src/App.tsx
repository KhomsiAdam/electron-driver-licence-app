import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';

const App: FC = () => {
  return (
    <main className='flex flex-col justify-center h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  );
};

export default App;
