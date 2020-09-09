import React from 'react';
import moment from 'moment';

import './schedule.css';
import { list_scheduled_departures } from '../../api/mbta.js';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {departures: []};
  }

  componentDidMount() {
    list_scheduled_departures(this.props.stop_id).then(schedule => this.setState({departures: schedule}));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.stop_id === this.props.stop_id) return;
    list_scheduled_departures(this.props.stop_id).then(schedule => this.setState({departures: schedule}));
  }

  render() {
    console.log(this.state.departures);

    const departures = this.state.departures.map((departure, idx) => (
      <tr className="schedule-row" key={`departure-${idx}`}>
        <td>MBTA</td>
        <td>{departure.attributes.departure_time}</td>
        <td>PORTLAND, ME</td>
        <td>697</td>
        <td>TBD</td>
        <td>ON TIME</td>
      </tr>
    ));

    return (<div id="schedule">
      <div class="schedule-header">
        <div>
          <h2>Sunday</h2>
          <p>12-11-2011</p>
        </div>
        <h1>North Station Information</h1>
        <div>
          <h2>CURRENT TIME</h2>
          <p>{moment(new Date()).format("HH:mm")}</p>
        </div>
      </div>

      <table>
        <tr class="schedule-row">
          <th>CARRIER</th><th className="time">TIME</th><th>DESTINATION</th><th>TRAIN#</th><th>TRACK#</th><th>STATUS</th>
        </tr>
        {departures}
      </table>
    </div>);
  }
}

export default Schedule;
