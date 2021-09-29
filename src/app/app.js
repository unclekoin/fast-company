import React, { useEffect, useState } from "react";
import api from "./api";
import Users from "./components/users";

const App = () => {
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

  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5 d-flex">
      {users ? (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default App;
