import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import QuizContext from '../context/QuizScoreContext';
// import { useAuth } from '@/hooks';

// import { axiosPrivate } from '@/api/axios';

const apiUrl = 'http://localhost:4000/api';

interface LoginInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(QuizContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data: any) => {
    console.log('data submitted: ', data);
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    localStorage.setItem('token', res.token);
  };

  const handleLogout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      setToken('');
      navigate('/');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token') as string);
    }
  });

  return (
    <>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={handleLogout}>Logout</button>
      {!token ? (
        <form
          className='container mx-auto w-[70%]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-1 gap-4'>
            <label className='text-lg font-medium text-gray-700 select-none'>
              Email
            </label>
            <input
              className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
              type='email'
              placeholder='Email'
              {...register('email')}
            />
            <p className='text-lg font-medium select-none text-primary-500'>
              {errors.email?.message}
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4'>
            <label className='text-lg font-medium text-gray-700 select-none'>
              Password
            </label>
            <input
              className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
              type='text'
              placeholder='Password'
              {...register('password')}
            />
            <p className='text-lg font-medium select-none text-primary-500'>
              {errors.password?.message}
            </p>
          </div>
          <div className='flex justify-end'>
            <button
              className='w-full py-3 mt-4 text-lg select-none btn-primary'
              onClick={() => console.log('submit')}
            >
              Submit
            </button>
          </div>
        </form>
      ) : null}
    </>
  );
}

export default Login;
