import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './App.css';
import Route from './components/route/route.js';
import Schedule from './components/schedule/schedule.js';
import LogoBar from './components/logo-bar/logo-bar.js';

import { list_commuter_rail_routes } from './api/mbta.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      selected_route: "",
      selected_route_idx: 0,
      selected_stop: ""
    };
    this._handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  componentDidMount() {
    list_commuter_rail_routes().then(routes => this.setState({routes: routes, selected_route: routes[0]}));
  }

  handleRouteSelect(selected_route) {
    this.setState({selected_route: selected_route.value.route, selected_route_idx: selected_route.value.idx});
  }

  handleStopSelect(selected_stop) {
    this.setState({selected_stop});
  }

  render() {
    const route_options = this.state.routes.map((route, idx) => (
      {value: {route: route, idx: idx}, label: route.attributes.long_name}
    ));

    const active_route = route_options.length > 0 ? route_options[this.state.selected_route_idx].label : "loading";

    return (<div id="app">
      <div id="route-manager">
        <Dropdown options={route_options} onChange={this._handleRouteSelect} value={active_route}/>
        {this.state.selected_route !== "" ?
          <Route handleStopSelect={(stop) => this.handleStopSelect(stop)} route_id={this.state.selected_route.id}/>
          : <div/>
        }
      </div>
      <div id="schedule-manager">
        {this.state.selected_stop !== "" ?
          <Schedule stop={this.state.selected_stop} route={this.state.selected_route} routes={this.state.routes}/>
          : <div/>
        }
      </div>
      <div/>

      <LogoBar/>
    </div>);
  }
}

export default App;
