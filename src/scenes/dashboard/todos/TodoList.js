import React from 'react';
import { RIEInput } from 'riek'
import _ from 'lodash'

import Todo from './Todo';

const styles = {
    container: {
        marginTop: '20px',
        position: 'relative'
    },
    deleteBtn: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        fontSize: '14px'
    },
    addBtn: {
        marginTop: '10px',
        fontSize: '12px',
    },
}


const TodoList = ({ todolist, handleTitleChange, handleTodoChange, handleToggleComplete, deleteList, addNewTodo }) => (
    <div style={styles.container} className="card">
        <div className="card-body">
            <h4 className="card-title">
                <RIEInput
                    value={todolist.name}
                    change={(e) => handleTitleChange(e, todolist.id)}
                    propName='title'
                    validate={_.isString} />
            </h4>
            <ul className="list-group list-group-flush">
                {todolist.todos.map((todo, index) => {
                    return <Todo
                        index={index}
                        key={index}
                        todo={todo}
                        todolist={todolist}
                        handleTodoChange={handleTodoChange}
                        handleToggleComplete={handleToggleComplete}
                    />
                })}
            </ul>
            <button onClick={() => addNewTodo(todolist)} style={styles.addBtn} className="btn btn-outline-success">New Task</button>
            <button onClick={() => deleteList(todolist.id)} style={styles.deleteBtn} type="button" className="btn btn-danger">X</button>
        </div>
    </div>
);

export default TodoList;