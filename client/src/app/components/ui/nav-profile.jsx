import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (!currentUser) return <h4>Loading...</h4>;

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          className="img-responsive rounded-circle"
          height="40"
        />
      </div>
      <div className={`w-100 dropdown-menu${isOpen ? " show" : ""}`}>
        <Link className="dropdown-item" to={`/users/${currentUser._id}`}>
          Профиль
        </Link>
        <Link className="dropdown-item" to="/logout">
          Выйти из системы
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
