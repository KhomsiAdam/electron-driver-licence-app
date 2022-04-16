import { useContext, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import QuizContext from '../context/QuizScoreContext';
import { apiUrl, minimumScore } from '../../constants';
interface FormInputs {
  email: string;
  firstname: string;
  lastname: string;
  day: number;
  month: number;
  year: number;
  CIN: string;
  phone: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  day: yup.number().required().min(1).max(31).typeError('invalid day'),
  month: yup.number().required().min(1).max(12).typeError('invalid month'),
  year: yup.number().required().typeError('invalid year'),
  CIN: yup.string().required(),
  phone: yup.string().required(),
});

export default function Overlay({ restartQuiz }: { restartQuiz: () => void }) {
  const { totalScore, tries } = useContext(QuizContext);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputNumbers = (e: any) => {
    // if (e.target.value.length > e.target.maxLength) {
    //   e.target.value = e.target.value.slice(0, e.target.maxLength);
    // }
    // check if e.target.value is a number
    if (e.target.value !== '') {
      if (parseInt(e.target.value) <= 0) {
        e.target.value = parseInt(e.target.min);
      } else if (e.target.value > parseInt(e.target.max)) {
        e.target.value = parseInt(e.target.max);
      } else {
        e.target.value = parseInt(e.target.value);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: any) => {
    data.score = totalScore;
    data.birthdate = `${data.year}-${('0' + data.month).slice(-2)}-${(
      '0' + data.day
    ).slice(-2)}`;
    delete data.year;
    delete data.month;
    delete data.day;
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
            <div className='mb-4 text-2xl font-bold text-center'>
              Please fill your information to complete your register process.
            </div>
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    Firstname
                  </label>
                  <input
                    className='input-primary'
                    type='text'
                    placeholder='John'
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
                    className='input-primary'
                    type='text'
                    placeholder='Doe'
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
                    className='input-primary'
                    type='email'
                    placeholder='example@email.com'
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
                  <div className='grid grid-cols-[1fr,1fr,2fr] gap-4'>
                    <div className='grid gap-2'>
                      <input
                        className='w-full text-center input-primary'
                        type='number'
                        placeholder='DD'
                        min={1}
                        max={31}
                        // maxLength={2}
                        onInput={handleInputNumbers}
                        {...register('day')}
                      />
                    </div>
                    <div className='grid gap-2'>
                      <input
                        className='w-full text-center input-primary'
                        type='number'
                        placeholder='MM'
                        min={1}
                        max={12}
                        // maxLength={2}
                        onInput={handleInputNumbers}
                        {...register('month')}
                      />
                    </div>
                    <div className='grid gap-2'>
                      <input
                        className='w-full text-center input-primary'
                        type='number'
                        placeholder='YYYY'
                        min={1900}
                        max={new Date().getFullYear() - 18}
                        // maxLength={4}
                        onInput={handleInputNumbers}
                        {...register('year')}
                      />
                    </div>
                  </div>
                  <p className='text-lg font-medium select-none text-primary-500'>
                    {errors.day?.message} {errors.month?.message}{' '}
                    {errors.year?.message}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='grid grid-cols-1 gap-4'>
                  <label className='text-lg font-medium text-gray-700 select-none'>
                    CIN
                  </label>
                  <input
                    className='input-primary'
                    type='text'
                    placeholder='X123456'
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
                    className='input-primary'
                    type='text'
                    placeholder='0123456789'
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
              className='text-lg btn-primary w-[150px] mt-4 select-none'
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}
