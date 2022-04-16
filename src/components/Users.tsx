import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import QuizContext from '../context/QuizScoreContext';
import Spinner from './Spinner';

const apiUrl = 'http://localhost:4000/api';

const Users = () => {
  const { token, setToken } = useContext(QuizContext);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const response = await fetch(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // if response 200 then set users else clear token
    if (response.status === 200) {
      const res = await response.json();
      setUsers(res);
    } else {
      setToken('');
      localStorage.removeItem('token');
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {token !== '' && Array.isArray(users) && users.length > 0 ? (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[80%]'>
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-white uppercase bg-primary-500'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Name
                </th>
                <th scope='col' className='px-6 py-3'>
                  CIN
                </th>
                <th scope='col' className='px-6 py-3'>
                  Email
                </th>
                <th scope='col' className='px-6 py-3'>
                  Birthdate
                </th>
                <th scope='col' className='px-6 py-3'>
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr
                  key={user.id}
                  className='bg-white border-b hover:bg-gray-50 '
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                  >
                    {user.firstname} {user.lastname}
                  </th>
                  <td className='px-6 py-4'>{user.CIN}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>{moment(user.birthdate).format('YYYY-MM-DD')}</td>
                  <td className='px-6 py-4 font-bold text-primary-500'>
                    {user.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Users;
