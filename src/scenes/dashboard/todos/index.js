import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    updateTodolist,
    createNewList,
    deleteList,
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
                handleToggleComplete={this.handleToggleComplete.bind(this)}
                deleteList={this.deleteList.bind(this)}
                addNewTodo={this.addNewTodo.bind(this)}
            />
        })
    }

    handleTitleChange(e, id) {
        const data = { name: e.title }

        this.props.updateTodolist(id, data);
    }

    addNewTodo(todolist) {
        const tempTodos = todolist.todos

        const newTodo = {
            text: 'New Task',
            completed: false
        }

        tempTodos.push(newTodo);

        const data = { todos: tempTodos };

        this.props.updateTodolist(todolist.id, data);
    }

    handleTodoChange(e, index, todolist) {
        const tempTodos = todolist.todos
        let currentTodo = tempTodos[index];

        // here if there's no text
        // just delete the task outright
        if (e.text.length > 0) {
            currentTodo.text = e.text;
            tempTodos.splice(index, 1, currentTodo);
        } else {
            tempTodos.splice(index, 1);
        }

        const data = { todos: tempTodos }

        this.props.updateTodolist(todolist.id, data);
    }

    handleToggleComplete(e, index, todolist) {
        const tempTodos = todolist.todos
        let currentTodo = tempTodos[index];

        currentTodo.completed = !currentTodo.completed;
        tempTodos.splice(index, 1, currentTodo);

        const data = { todos: tempTodos }

        this.props.updateTodolist(todolist.id, data);
    }

    addNewList() {
        const { user, selectedDate, createNewList } = this.props;
        const data = {
            owner: user.id,
            date: selectedDate || new Date()
        }

        console.log(data, 'add new lsit');
        createNewList(data);
    }

    deleteList(id) {
        this.props.deleteList(id);
    }

    render() {
        return (
            <div>
                <button onClick={this.addNewList.bind(this)} type="button" className="btn btn-outline-success">New List</button>
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
    updateTodolist,
    createNewList,
    deleteList
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)