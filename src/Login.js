import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const roles = {
    admin: "admin",
    user: "user",
  };

  const list = [
    {
      username: "1",
      password: "1",
      role: roles.user,
    },
    {
      username: "2",
      password: "2",
      role: roles.user,
    },
    {
      username: "3",
      password: "3",
      role: roles.user,
    },
    {
      username: "admin",
      password: "admin",
      role: roles.admin,
    },
  ];

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = list.find((user) => user.username === username && user.password === password);
    if (user) {
      onLogin(user.username);
      navigate("/afterlogin");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
