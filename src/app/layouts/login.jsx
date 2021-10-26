import React, { useState } from "react";
import TextField from "../components/text-field";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      <button>Отправить</button>
    </form>
  );
};

export default Login;
