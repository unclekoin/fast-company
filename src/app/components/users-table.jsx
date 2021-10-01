import React from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHeader from "./table-header";

const UsersTable = ({ users, onSort, selectedSort, ...rest }) => {
  const columns = {
    name: { iter: "name", name: " Имя" },
    qualities: { name: "Качества" },
    professions: { iter: "profession.name", name: "Профессия" },
    completedMeetings: { iter: "completedMeetings", name: "Встретился, раз" },
    rate: { iter: "rate", name: "Оценка" },
    bookmark: { iter: "bookmark", name: "Избранное" },
    delete: {}
  };

  return (
    <table className="table">
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default UsersTable;