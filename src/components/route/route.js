import React from 'react';

import './route.css';
import { list_route_stops } from '../../api/mbta.js';

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stops : [], selected_stop: 0};
  }

  componentDidMount() {
    list_route_stops(this.props.route_id).then(stops => this.setState({stops: stops}));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.route_id === this.props.route_id) return;

    list_route_stops(this.props.route_id).then(stops => this.setState({stops: stops, selected_stop: 0}));
  }

  handleStopSelect(selected_stop) {
    this.setState({selected_stop});
  }

  render() {

    const stops = this.state.stops.map((stop, idx) => (
      <div className="stop" key={`stop-${idx}`}>
        <div className={this.state.selected_stop === idx ? "stop-content selected" : "stop-content"}
             onClick={() => this.handleStopSelect(idx)}>
          <div className="stop-pip"/>
          <span className="stop-label">{stop.attributes.name}</span>
        </div>
        { idx + 1 !== this.state.stops.length ? <div className="stop-connector"/> : <div/>}
      </div>
    ));

    return (<div id="stop">
      {stops}
    </div>);
  }
}

export default Route;
