import React from 'react';
import User from './user';

const Users = ({ users, ...rest }) => {
  return (
    <>
      {!!users.length && (
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Имя
              </th>
              <th className="text-center" scope="col">
                Качества
              </th>
              <th className="text-center" scope="col">
                Профессия
              </th>
              <th className="text-center" scope="col">
                Встретился, раз
              </th>
              <th className="text-center" scope="col">
                Оценка
              </th>
              <th className="text-center" scope="col">
                Избранное
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
