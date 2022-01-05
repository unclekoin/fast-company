import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import NavProfile from "./nav-profile";

const Navbar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Главная
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Пользователи
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" to="/login">
              Регистрация
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
