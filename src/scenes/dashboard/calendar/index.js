import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { renderToStaticMarkup } from 'react-dom/server';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'rc-time-picker/assets/index.css';

import SweetAlert from 'react-bootstrap-sweetalert';

BigCalendar.setLocalizer(
    BigCalendar.momentLocalizer(moment)
);
class Calendar extends Component {
    state = {
        showSwal: false,
        startTimeChoice: null,
        endTimeChoice: null
    }

    handleTimeChange(value, key) {
        console.log(value, key);
    }

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

    handleSelectEvent(event) {
        console.log(event, 'EVENT');
        this.setState({ showSwal: true })
    }

    handleSlotEvent(event) {
        console.log(event, 'SLOT');
    }

    // console.log

    render() {
        const format = 'h:mm a';
        const now = moment().hour(0).minute(0);

        // const swalHtml = (
        //     <div style={{ height: '300px' }}>
        //         <TimePicker
        //             showSecond={false}
        //             defaultValue={now}
        //             onChange={() => this.handleTimeChange('startTimeChoice')}
        //             format={format}
        //             use12Hours
        //         />
        //     </div>
        // )

        return (
            <div>
                <BigCalendar
                    style={{ height: '500px' }}
                    events={this.sanitizeEvents(this.props.user.events)}
                    onSelectEvent={e => this.handleSelectEvent(e)}
                    onSelectSlot={e => this.handleSlotEvent(e)}
                />
                <SweetAlert
                    show={this.state.showSwal}
                    title={'Hellow'}
                    onConfirm={() => console.log('blah')}
                >
                    <TimePicker
                        showSecond={false}
                        defaultValue={now}
                        onChange={() => this.handleTimeChange('startTimeChoice')}
                        format={format}
                        use12Hours
                    />
                </SweetAlert>
            </div>
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