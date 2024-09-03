import React, { useState } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm({ addTodo, selectedAssignee, people, isAdmin }) {
  const [text, setText] = useState("");
  const [assignee, setAssignee] = useState(isAdmin ? "" : selectedAssignee);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text, assignee);
    setText("");
    setAssignee(isAdmin ? "" : selectedAssignee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task:
        <input
          className={styles.input}
          type="text"
          value={text}
          placeholder="Add a new Task"
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <label>
        Assignee:
        <select
          className={styles.select}
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          {isAdmin ? (
            <>
              <option value="">Select Assignee</option>
              {people.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </>
          ) : (
            <option value={selectedAssignee}>
              {selectedAssignee}
            </option>
          )}
        </select>
      </label>
      <button className={styles.button} type="submit" disabled={!text || !assignee}>
        Add
      </button>
    </form>
  );
}
