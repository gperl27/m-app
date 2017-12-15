import React from 'react';
import { RIEInput } from 'riek'
import _ from 'lodash'

const styles = {
    todoContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const Todo = ({ todolist, todo, index, handleTodoChange }) => (
    <li style={styles.todoContainer} className="list-group-item">
        <RIEInput
            value={todo.text}
            change={(e) => handleTodoChange(e, index, todolist)}
            propName='text'
            validate={_.isString} />
        <span>checkbox here</span>
    </li>
);

export default Todo;