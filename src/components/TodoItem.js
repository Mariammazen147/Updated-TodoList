import React from "react";
import styles from './TodoItem.module.css'

const TodoItem = ({ todo, index, removeTodo, toggleTodo }) => {
    return (
        <div className="styles.todoItem">
          <input type="checkbox"
          className={styles.checkbox}
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
          />
            <span 
              className={styles.todoText}
              style={{ textDecoration: todo.isCompleted ? 'line-through' : ''}}>
                {todo.text}, Assigned to: {todo.assignee ? todo.assignee : "Unassigned"} 
              </span>
              <button className={styles.removeButton} onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
    );
};

export default TodoItem;