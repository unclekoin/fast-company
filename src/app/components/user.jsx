import React from 'react';
import Qualities from './qualities';
import BookMark from './bookmark';

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onToggleBookMark,
  onDelete,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
      {qualities.map((quality) => (
        <Qualities key={quality._id} quality={quality} />
      ))}      
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} / 5</td>
      <td>
        <BookMark onClick={() => onToggleBookMark(_id)} status={bookmark} />
      </td>
      <td>
        <button onClick={() => onDelete(_id)} className="btn btn-danger">
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
