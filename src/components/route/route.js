import React from 'react';

import './route.css';
import { list_route_stops } from '../../api/mbta.js';

class Route extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stops : [], selected_stop_idx: 0, selected_stop: ""};
  }

  componentDidMount() {
    list_route_stops(this.props.route_id).then(stops => {
      this.setState({stops: stops});
      this.props.handleStopSelect(stops.length > 0 ? stops[0].id : "")
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.route_id === this.props.route_id) return;
    list_route_stops(this.props.route_id).then(stops => {
      this.setState({stops: stops})
      this.props.handleStopSelect(stops.length > 0 ? stops[0].id : "")
    });
  }

  handleStopSelect(selected_stop_idx) {
    this.setState({selected_stop_idx: selected_stop_idx});
    this.props.handleStopSelect(this.state.stops[selected_stop_idx].id);
  }

  render() {

    const stops = this.state.stops.map((stop, idx) => (
      <div className="stop" key={`stop-${idx}`}>
        <div className={this.state.selected_stop_idx === idx ? "stop-content selected" : "stop-content"}
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
