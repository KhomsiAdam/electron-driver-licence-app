import { useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import QuizContext from '../context/QuizScoreContext';

const apiUrl = 'http://localhost:4000/api';
interface FormInputs {
  email: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  CIN: string;
  phone: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  birthdate: yup.date().required().typeError('Date is not valid'),
  CIN: yup.string().required(),
  phone: yup.string().required(),
});

export default function Overlay({ restartQuiz }: { restartQuiz: () => void }) {
  const { totalScore, tries } = useContext(QuizContext);
  const [success, setSuccess] = useState<boolean>(false);
  const minimumScore = 1;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    console.log('data submitted: ', data);
    data.score = 35;
    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
  };

  return (
    <div className='fixed z-40 flex items-center justify-center w-screen h-screen px-4 text-xl text-gray-100 bg-gray-900 bg-opacity-90 bg-blend-overlay md:text-3xl'>
      <div className='flex flex-col w-[850px] items-center p-8 text-black bg-white rounded-3xl'>
        {success && (
          <>
            <div className='mb-4 text-3xl font-bold text-center'>
              Please fill your information to complete your register process.
            </div>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    Firstname
                  </label>
                  <input
                    className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
                    type='text'
                    placeholder='Firstname'
                    {...register('firstname')}
                  />
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.firstname?.message}
                  </p>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    Lastname
                  </label>
                  <input
                    className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
                    type='text'
                    placeholder='Lastname'
                    {...register('lastname')}
                  />
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.lastname?.message}
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
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
                    Birthdate
                  </label>
                  <input
                    className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
                    type='date'
                    placeholder='Birthdate'
                    {...register('birthdate')}
                  />
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.birthdate?.message}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    CIN
                  </label>
                  <input
                    className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
                    type='text'
                    placeholder='CIN'
                    {...register('CIN')}
                  />
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.CIN?.message}
                  </p>
                </div>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    Phone
                  </label>
                  <input
                    className='h-[50px] py-3 text-base font-normal text-gray-800 border-2 border-solid rounded-full select-none focus:border-primary-500'
                    type='text'
                    placeholder='Phone'
                    {...register('phone')}
                  />
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.phone?.message}
                  </p>
                </div>
              </div>
              <div className='flex justify-end'>
                <button className='w-full py-3 mt-4 text-lg select-none btn-primary'>
                  Submit
                </button>
              </div>
            </form>
          </>
        )}
        {!success && tries > 0 && totalScore < minimumScore && (
          <>
            <div className='grid gap-4'>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                Nice try!
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                You answered
              </div>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                {totalScore} / 40
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                Correctly
              </div>
            </div>
            <button
              onClick={restartQuiz}
              className='text-lg btn-primary w-[150px] mt-4'
            >
              Restart
            </button>
            <div className='mt-4 text-lg font-medium text-center text-gray-700 select-none'>
              You have {tries} try left.
            </div>
          </>
        )}
        {!success && tries === 0 && totalScore < minimumScore && (
          <>
            <div className='grid gap-4'>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                Sorry!
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                You answered
              </div>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                {totalScore} / 40
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                Correctly
              </div>
            </div>
            <div className='mt-4 text-lg font-medium text-center text-gray-700 select-none'>
              You have exceeded the number of tries.
            </div>
          </>
        )}
        {!success && totalScore >= minimumScore && (
          <>
            <div className='grid gap-4'>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                Congratulations!
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                You answered
              </div>
              <div className='text-2xl font-bold text-center uppercase select-none text-primary-500'>
                {totalScore} / 40
              </div>
              <div className='text-lg font-medium text-center text-gray-700 select-none'>
                Correctly
              </div>
            </div>
            <button
              onClick={() => setSuccess(true)}
              className='text-lg btn-primary w-[150px] mt-4'
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
