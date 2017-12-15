import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import SweetAlert from 'react-bootstrap-sweetalert';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'rc-time-picker/assets/index.css';
import {
    updateUserEvent,
    newUserEvent,
    selectDate,
} from '../../../modules/user'


BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);

const formatDate = (selectedDate, dateToExtractTimeFrom) => {
    const time = dateToExtractTimeFrom.format('h:mm a');
    const date = selectedDate.format('MM-DD-YYYY');

    return moment(`${date} ${time}`, "MM-DD-YYYY h:mm a");
}

class Calendar extends Component {
    state = {
        showSwal: false,
        startTimeChoice: null,
        endTimeChoice: null,
        showEditSwal: false,
        editEventId: null,
        editStartTimeChoice: null,
        editEndTimeChoice: null,
        editTitle: '',
        newTitle: '',
    }

    handleTimeChange(value, key) {
        let newState = {}
        newState[key] = value

        this.setState(newState)
    }

    sanitizeEvents(events) {
        return events.map(event => {
            return {
                id: event.id,
                title: event.description,
                start: moment(event.start),
                allDay: true,
                end: moment(event.end)
            }
        })
    }

    handleSelectEvent(event) {
        const { start, end, id, title } = event;
        this.props.selectDate(start);
        this.setState({
            editTitle: title,
            editStartTimeChoice: start,
            editEndTimeChoice: end,
            editEventId: id,
            showEditSwal: true
        })
    }

    handleUpdateEventTime() {
        const { editStartTimeChoice, editEndTimeChoice, editEventId, editTitle } = this.state;

        const data = {
            description: editTitle,
            start: formatDate(this.props.selectedDate, editStartTimeChoice),
            end: formatDate(this.props.selectedDate, editEndTimeChoice),
        }

        this.props.updateUserEvent(editEventId, data);

        this.setState({ showEditSwal: false });
    }

    handleSlotEvent(event) {
        this.props.selectDate(moment(event.start));

        this.setState({
            showSwal: true
        })
    }

    handleNewEvent() {
        const { startTimeChoice, endTimeChoice, newTitle } = this.state;

        const data = {
            owner: 1,
            description: newTitle || 'New Event',
            start: formatDate(this.props.selectedDate, startTimeChoice),
            end: formatDate(this.props.selectedDate, endTimeChoice),
        }

        this.props.newUserEvent(data);

        this.setState({ showSwal: false, newTitle: '' });
    }

    handleInputChange(e, key) {
        let data = {};
        data[key] = e.target.value;

        this.setState(data);
    }

    render() {
        const format = 'h:mm a';
        const defaultStart = moment().hour(12).minute(0);
        const defaultEnd = moment().hour(13).minute(0);

        return (
            <div>
                <BigCalendar
                    style={{ height: '500px' }}
                    selectable={true}
                    events={this.sanitizeEvents(this.props.user.events)}
                    onSelectEvent={e => this.handleSelectEvent(e)}
                    onSelectSlot={e => this.handleSlotEvent(e)}
                />
                <SweetAlert
                    showCancel
                    cancelBtnBsStyle="danger"
                    show={this.state.showEditSwal}
                    title="Edit an event"
                    onConfirm={this.handleUpdateEventTime.bind(this)}
                    onCancel={() => this.setState({ showEditSwal: false })}
                >
                    <hr />
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            aria-describedby="event title"
                            placeholder="Enter a title for this event..."
                            value={this.state.editTitle}
                            onChange={(e) => this.handleInputChange(e, 'editTitle')}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4>Start</h4>
                            <TimePicker
                                showSecond={false}
                                defaultValue={defaultStart}
                                onChange={(e) => this.handleTimeChange(e, 'editStartTimeChoice')}
                                format={format}
                                use12Hours
                                value={this.state.editStartTimeChoice}
                            />
                        </div>
                        <div className="col">
                            <h4>End</h4>
                            <TimePicker
                                showSecond={false}
                                defaultValue={defaultEnd}
                                onChange={(e) => this.handleTimeChange(e, 'editEndTimeChoice')}
                                format={format}
                                use12Hours
                                value={this.state.editEndTimeChoice}
                            />
                        </div>
                    </div>
                </SweetAlert>
                <SweetAlert
                    showCancel
                    cancelBtnBsStyle="danger"
                    show={this.state.showSwal}
                    title="Schedule an event"
                    onConfirm={this.handleNewEvent.bind(this)}
                    onCancel={() => this.setState({ showSwal: false })}
                >
                    <hr />
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            aria-describedby="event title"
                            placeholder="Enter a title for this event..."
                            value={this.state.newTitle}
                            onChange={(e) => this.handleInputChange(e, 'newTitle')}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4>Start</h4>
                            <TimePicker
                                showSecond={false}
                                defaultValue={defaultStart}
                                onChange={(e) => this.handleTimeChange(e, 'startTimeChoice')}
                                format={format}
                                use12Hours
                                value={this.state.startTimeChoice}
                            />
                        </div>
                        <div className="col">
                            <h4>End</h4>
                            <TimePicker
                                showSecond={false}
                                defaultValue={defaultEnd}
                                onChange={(e) => this.handleTimeChange(e, 'endTimeChoice')}
                                format={format}
                                use12Hours
                                value={this.state.endTimeChoice}
                            />
                        </div>
                    </div>
                </SweetAlert>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
    selectedDate: state.user.selectedDate,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateUserEvent,
    newUserEvent,
    selectDate
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar)