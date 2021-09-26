import React, { useState } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagintation";
import { paginate } from "../../utils/paginate";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const count = allUsers.length;
  const pageSize = 4;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (currentPage > Math.ceil(count / pageSize)) setCurrentPage((prev) => prev - 1);

  const users = paginate(allUsers, currentPage, pageSize);

  return (
    <>
      {!!count && (
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
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
