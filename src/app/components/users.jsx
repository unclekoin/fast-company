import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagintation";
import GroupList from "./group-list";
import SearchStatus from "./search-status";
import { paginate } from "../../utils/paginate";
import api from "../api";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const decreaseCurrentPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const increaseCurrentPage = () => setCurrentPage((prevPage) => prevPage + 1);

  const filteredUsers = selectedProf
    ? allUsers.filter(
      (user) =>
        JSON.stringify(user.profession) === JSON.stringify(selectedProf)
    )
    : allUsers;

  const count = filteredUsers.length;

  if (currentPage > Math.ceil(count / pageSize)) {
    setCurrentPage((prev) => prev - 1);
  }

  const users = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <>
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 me-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary" onClick={clearFilter}>
            Показать всех
          </button>
        </div>
      )}
      <main>
        <SearchStatus length={count} />
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
          onDecreaseCurrentPage={decreaseCurrentPage}
          onIncreaseCurrentPage={increaseCurrentPage}
        />
      </main>
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
