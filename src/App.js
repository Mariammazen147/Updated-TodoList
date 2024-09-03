import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import Login from "./Login";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("All");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const people = ["1", "2", "3", "admin"];

  const addTodo = (text, assignee) => {
    const newTodo = { id: Date.now(), text, isCompleted: false, assignee };
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const handleLogin = (username) => {
    setSelectedAssignee(username);
    const userRole = username === "admin" ? "admin" : "user";
    setRole(userRole);
    navigate("/afterlogin");
  };

  const handleLogout = () => {
    setSelectedAssignee("");
    setFilterAssignee("All");
    setRole("");
    navigate("/");
  };

  const filteredTodos =
    filterAssignee === "All"
      ? todos
      : todos.filter((todo) => todo.assignee === filterAssignee);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/afterlogin"
          element={
            role === "admin" ? (
              <>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
                <TodoForm addTodo={addTodo} people={people} isAdmin={true} />
                <label>
                  Filter by Assignee:
                  <select
                    className="select"
                    value={filterAssignee}
                    onChange={(e) => setFilterAssignee(e.target.value)}
                  >
                    <option value="All">All</option>
                    {people.map((person) => (
                      <option key={person} value={person}>
                        {person}
                      </option>
                    ))}
                  </select>
                </label>
                <TodoList
                  todos={filteredTodos}
                  removeTodo={removeTodo}
                  toggleTodo={toggleTodo}
                />
              </>
            ) : (
              <>
                <h1>Todo List</h1>
                <button onClick={handleLogout}>Logout</button>
                <TodoForm addTodo={addTodo} selectedAssignee={selectedAssignee} isAdmin={false} />
                <label>
                  Filter by Assignee:
                  <select
                    className="select"
                    value={filterAssignee}
                    onChange={(e) => setFilterAssignee(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value={selectedAssignee}>{selectedAssignee}</option>
                  </select>
                </label>
                <TodoList
                  todos={filteredTodos}
                  removeTodo={removeTodo}
                  toggleTodo={toggleTodo}
                />
              </>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
