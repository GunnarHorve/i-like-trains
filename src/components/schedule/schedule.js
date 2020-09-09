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
    list_scheduled_departures(this.props.stop.id, this.props.routes).then(schedule => this.setState({departures: schedule}));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.stop.id === this.props.stop.id) return;
    list_scheduled_departures(this.props.stop.id, this.props.routes).then(schedule => this.setState({departures: schedule}));
  }

  render() {
    console.log(this.state.departures);

    const departures = this.state.departures.map((departure, idx) => {
      if (!departure.attributes.departure_time) return;

      var matching_route = this.props.routes.find(route => route.id === departure.relationships.route.data.id);

      return (
        <tr className="schedule-row" key={`departure-${idx}`}>
          <td>MBTA</td>
          <td>{moment(departure.attributes.departure_time).format("HH:mm")}</td>
          <td>{matching_route.attributes.direction_destinations[departure.attributes.direction_id]}</td>
          <td>---</td>
          <td>TBD</td>
          <td>ON TIME</td>
        </tr>
      );
    });

    return (<div id="schedule">
      <div class="schedule-header">
        <div>
          <h2>Sunday</h2>
          <p>{moment(new Date()).format("MM-DD-YYYY")}</p>
        </div>
        <h1>{this.props.stop.attributes.name} Information</h1>
        <div>
          <h2>CURRENT TIME</h2>
          <p className='time-display'>{moment(new Date()).format("HH:mm")}</p>
        </div>
      </div>

      <table>
        <tr className="schedule-row">
          <th>CARRIER</th><th className="time">TIME</th><th>DESTINATION</th><th>TRAIN#</th><th>TRACK#</th><th>STATUS</th>
        </tr>
        {departures}
      </table>
    </div>);
  }
}

export default Schedule;
