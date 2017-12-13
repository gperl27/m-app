import React, { Component } from 'react';
import { connect } from 'react-redux';
class TodosContainer extends Component {
    render() {
        return (
            <div>
                <button type="button" className="btn btn-outline-success">New List</button>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Groceries</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                        <button type="button" className="btn btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodosContainer;