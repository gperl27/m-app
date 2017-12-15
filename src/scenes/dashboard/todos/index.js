import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TodoList from './TodoList';

class TodosContainer extends Component {
    renderTodoLists() {
        return this.props.user.todolists.map(todolist => {
            return <TodoList 
                key={todolist.id} 
                todolist={todolist} 
                handleTitleChange={this.handleTitleChange}
            />
        })
    }

    handleTitleChange(e) {
        console.log(e.title, 'input change');
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-outline-success">New List</button>
                {this.renderTodoLists()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    selectedDate: state.user.selectedDate,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)