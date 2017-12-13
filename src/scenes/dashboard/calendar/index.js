import React, { Component } from 'react';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);
class Calendar extends Component {
    render() {
        return (
            <BigCalendar
                style={{height: '500px'}}
                events={[]}
                startAccessor='startDate'
                endAccessor='endDate'
            />
        );
    }
}

export default Calendar;