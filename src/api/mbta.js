import axios from 'axios'

const baseurl = 'https://api-v3.mbta.com'

function list_commuter_rail_routes() {
  return axios.get(`${baseurl}/routes`, { params: {
    'filter[type]': '2'
  }}).then(response => response.data.data);
}

function list_route_stops(route_id) {
  return axios.get(`${baseurl}/stops`, { params: {
    'filter[route]': route_id
  }}).then(response => response.data.data);
}

function list_stop_shedule(stop) {
  return axios.get(`${baseurl}/schedules`, { params: {
    'filter[stop]': stop
  }}).then(response => response.data.data);
}

export { list_commuter_rail_routes, list_route_stops, list_stop_shedule }
