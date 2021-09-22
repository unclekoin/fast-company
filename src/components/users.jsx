import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const rednderPhrase = (number) => {
    const term =
      String(number).match(/[2-4]$/) &&
      String(number).slice(-2, -1) !== '1'
        ? 'человека'
        : 'человек';

    return (
      <span className={`badge bg-${number ? 'primary' : 'danger'} fs-2 mb-3`}>
        {number
          ? `${number} ${term} ${
              number === 1 ? 'тусанeт' : 'тусанут'
            } с тобой сегодня`
          : 'Никто с тобой не тусанет'}
      </span>
    );
  };

  return (
    <div className="container pt-5">
      {rednderPhrase(users.length)}
      {!!users.length && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge bg-${quality.color} me-1`}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} / 5</td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
