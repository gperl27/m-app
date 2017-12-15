import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    updateTodolist
} from '../../../modules/user'
import TodoList from './TodoList';

class TodosContainer extends Component {
    renderTodoLists() {
        return this.props.user.todolists.map(todolist => {
            return <TodoList
                key={todolist.id}
                todolist={todolist}
                handleTitleChange={this.handleTitleChange.bind(this)}
                handleTodoChange={this.handleTodoChange.bind(this)}
            />
        })
    }

    handleTitleChange(e, id) {
        const data = { name: e.title }

        this.props.updateTodolist(id, data);
    }

    handleTodoChange(e, index, todolist) {
        const tempTodos = todolist.todos
        let currentTodo = tempTodos[index];

        currentTodo.text = e.text;
        tempTodos.splice(index, 1, currentTodo);

        const data = { todos: tempTodos }
        
        this.props.updateTodolist(todolist.id, data);
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
    updateTodolist
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)