const addFavoriteUser = (id) => {
  const favoriteUsers = localStorage.favoriteUsers ? JSON.parse(localStorage.favoriteUsers) : [];
  if (!favoriteUsers.includes(id)) {
    favoriteUsers.push(id);
    localStorage.favoriteUsers = JSON.stringify(favoriteUsers);
  } else {
    const filteredUsers = favoriteUsers.filter((userId) => userId !== id);
    localStorage.favoriteUsers = JSON.stringify(filteredUsers);
  }
};

export default addFavoriteUser;
