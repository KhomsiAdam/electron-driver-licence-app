import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
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
  console.log(localStorage.getItem('token'));
  
  // const { setAuth, persist, setPersist } = useAuth();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  // const userRef = useRef();
  // const errRef = useRef();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [errMsg, setErrMsg] = useState('');

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

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  // useEffect(() => {
  //   setErrMsg('');
  // }, [email, password]);

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   console.log('Login');

  // try {
  //   const response = await axiosPrivate.post(
  //     LOGIN_ENDPOINT,
  //     JSON.stringify({ email, password }),
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //       withCredentials: true,
  //     }
  //   );
  //   console.log(JSON.stringify(response?.data));
  //   const accessToken = response?.data?.token;
  //   const roles = response?.data?.role;
  //   setAuth({ email, password, roles, accessToken });
  //   setEmail('');
  //   setPassword('');
  //   navigate(from, { replace: true });
  // } catch (err) {
  //   if (!err?.response) {
  //     setErrMsg('No Server Response');
  //   } else if (err.response?.status === 400) {
  //     setErrMsg('Missing Username or Password');
  //   } else if (err.response?.status === 401) {
  //     setErrMsg('Unauthorized');
  //   } else {
  //     setErrMsg('Login Failed');
  //   }
  //   errRef.current.focus();
  // }
  // };

  // const togglePersist = () => {
  //   setPersist((prev) => !prev);
  // };

  // useEffect(() => {
  //   localStorage.setItem('persist', persist);
  // }, [persist]);

  return (
    <>
    {localStorage.getItem('token') ? (
    <form className='container w-full mx-auto' onSubmit={handleSubmit(onSubmit)}>
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
    ) : (
      null
    )}

      </>
  );
}

export default Login;
