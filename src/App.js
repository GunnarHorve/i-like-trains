import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import './App.css';
import Route from './components/route/route.js'

import { list_commuter_rail_routes } from './api/mbta.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {routes: [], selected_route: "", selected_route_idx: 0};
    this._handleRouteSelect = this.handleRouteSelect.bind(this);
  }

  componentDidMount() {
    list_commuter_rail_routes().then(routes => this.setState({routes: routes, selected_route: routes[0].id}));
    // list_stop_shedule("place-FB-0118").then( schedules => console.log(schedules))
  }

  handleRouteSelect(selected_route) {
    this.setState({selected_route: selected_route.value.id, selected_route_idx: selected_route.value.idx});
  }

  render() {
    const route_options = this.state.routes.map((route, idx) => (
      {value: {id: route.id, idx: idx}, label: route.attributes.long_name}
    ));

    const active_route = route_options.length > 0 ? route_options[this.state.selected_route_idx].label : "loading";

    return (<div id="app">
      <div id="route-manager">
        <Dropdown options={route_options} onChange={this._handleRouteSelect} value={active_route}/>
        {this.state.selected_route !== "" ? <Route route_id={this.state.selected_route}></Route> : <div/>}
      </div>
      <div/>
    </div>);
  }
}

export default App;
