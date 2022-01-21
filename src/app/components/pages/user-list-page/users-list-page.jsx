import React, { useState, useEffect } from "react";
import _ from "lodash";
import { paginate } from "../../../../utils/paginate";
import PropTypes from "prop-types";
import Pagination from "../../common/pagination";
import GroupList from "../../common/group-list";
import SearchStatus from "../../ui/search-status";
import UsersTable from "../../ui/users-table";
import SearchField from "../../common/form/search-field";
import { useAuth } from "../../../hooks/use-auth";
import { useSelector, useDispatch } from "react-redux";
import { getProfessions, getProfessionsLoadingStatus, loadProfessionsList } from "../../../store/professions";
import { getUsersList } from "../../../store/users";

const UsersListPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList());
  const { currentUser } = useAuth();
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 8;

  useEffect(() => {
    dispatch(loadProfessionsList());
  }, []);

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState.filter((item) => item._id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const userIndex = newUsers.findIndex((user) => user._id === id);
    newUsers[userIndex].bookmark = !users[userIndex].bookmark;
    // setUsers(newUsers);
    console.log(newUsers);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
    setSearchQuery("");
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSearchQuery(target.value);
    setSelectedProf();
  };

  const decreaseCurrentPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const increaseCurrentPage = () => setCurrentPage((prevPage) => prevPage + 1);

  if (users) {
    function filterUsers(data) {
      const foundUsers = searchQuery
        ? data.filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : selectedProf ? data.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        ) : data;

      return foundUsers.filter((user) => user._id !== currentUser._id);
    }

    const foundUsers = filterUsers(users);

    const count = foundUsers.length;

    const sortedUsers = _.orderBy(foundUsers, [sortBy.path], [sortBy.order]);

    if (currentPage > Math.ceil(count / pageSize)) {
      setCurrentPage((prev) => prev - 1);
    }

    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
      setSelectedProf();
      setSearchQuery("");
    };

    return (
      <div className="col-lg-8 mx-auto p-3 py-md-5 d-flex">
        {professions && !professionsLoading && (
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
          <SearchField
            onChange={handleSearchQuery}
            value={searchQuery}
            placeholder="Найти..."
          />
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
      </div>
    );
  }
  return <div>Loading...</div>;
};

UsersListPage.propTypes = {
  users: PropTypes.array
};

export default UsersListPage;
