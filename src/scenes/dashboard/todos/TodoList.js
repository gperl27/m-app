import React from 'react';
import { RIEInput } from 'riek'
import _ from 'lodash'

import Todo from './Todo';


const TodoList = ({todolist, handleTitleChange}) => (
    <div className="card">
        <div className="card-body">
            <h4 className="card-title">
                <RIEInput
                    value={todolist.name}
                    change={handleTitleChange}
                    propName='title'
                    validate={_.isString} />
            </h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <button type="button" className="btn btn-outline-danger">Delete</button>
        </div>
    </div>
);

export default TodoList;