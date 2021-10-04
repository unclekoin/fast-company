import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Pagination from "./pagintation";
import GroupList from "./group-list";
import SearchStatus from "./search-status";
import { paginate } from "../../utils/paginate";
import api from "../api";
import UsersTable from "./users-table";
import _ from "lodash";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const userIndex = newUsers.findIndex((user) => user._id === id);
    newUsers[userIndex].bookmark = !users[userIndex].bookmark;
    setUsers(newUsers);
  };

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

  const handleSort = (item) => {
    setSortBy(item);
  };

  const decreaseCurrentPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const increaseCurrentPage = () => setCurrentPage((prevPage) => prevPage + 1);

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
      : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    if (currentPage > Math.ceil(count / pageSize)) {
      setCurrentPage((prev) => prev - 1);
    }

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

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
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
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
  }
  return <div>Loading...</div>;
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
