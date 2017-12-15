import React from 'react';
import { RIEInput } from 'riek'
import _ from 'lodash'

const styles = {
    todoContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    completed: {
        textDecoration: 'line-through'
    },
    input: {
        position: 'inherit'
    }
}

const Todo = ({ todolist, todo, index, handleTodoChange, handleToggleComplete }) => (
    <li style={todo.completed ? { ...styles.todoContainer, ...styles.completed } : styles.todoContainer} className="list-group-item">
        <RIEInput
            value={todo.text}
            change={(e) => handleTodoChange(e, index, todolist)}
            propName='text'
            validate={_.isString} />
        <input
            checked={todo.completed}
            onChange={(e) => handleToggleComplete(e, index, todolist)}
            style={styles.input}
            type="checkbox"
            className="form-check-input"
        />
    </li>
);

export default Todo;