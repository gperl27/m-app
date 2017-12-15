import React from 'react';
import { RIEInput } from 'riek'
import _ from 'lodash'

import Todo from './Todo';


const TodoList = ({ todolist, handleTitleChange, handleTodoChange, handleToggleComplete }) => (
    <div className="card">
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
            <button type="button" className="btn btn-outline-danger">Delete</button>
        </div>
    </div>
);

export default TodoList;