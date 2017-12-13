import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);
class Calendar extends Component {
    sanitizeEvents(events) {
        return events.map(event => {
            return {
                title: event.description,
                start: moment(event.start),
                allDay: true,
                end: moment(event.end)
            }
        })
    }

    // console.log

    render() {
        console.log(this.props.user.events);
        return (
            <BigCalendar
                style={{ height: '500px' }}
                events={this.sanitizeEvents(this.props.user.events)}
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar)