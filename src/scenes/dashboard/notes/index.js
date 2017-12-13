import React, { Component } from 'react';
import { connect } from 'react-redux';
class NotesContainer extends Component {
    render() {
        return (
            <div className="card" style={{marginTop: '25px', marginBottom: '25px'}}>
                <div className="card-body">
                    <h2>Reminders</h2>
                    <textarea placeholder="Don't forget to take poochie for a walk!"></textarea>
                </div>
            </div>
        );
    }
}

export default NotesContainer;