import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/search-status";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((item) => item._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const userIndex = newUsers.findIndex((user) => user._id === id);
    newUsers[userIndex].bookmark = !users[userIndex].bookmark;
    setUsers(newUsers);
  };

  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <SearchStatus length={users.length} />
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      </main>
    </div>
  );
};

export default App;
