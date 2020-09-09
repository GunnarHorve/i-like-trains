import axios from 'axios'
import moment from 'moment';

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

function list_scheduled_departures(stop, routes) {
  var now = new Date();

  return axios.get(`${baseurl}/schedules`, { params: {
    'filter[stop]': stop,
    'sort': 'departure_time',
    'page[limit]': '10',
    'filter[date]': moment(now).format("YYYY-MM-DD"),
    'filter[min_time]': moment(now).format("HH:mm"),
    'filter[route]': routes.map(route => route.id).join(','),
    'include': 'stop,trip,prediction,route'
  }}).then(response => response.data.data);
}

export { list_commuter_rail_routes, list_route_stops, list_scheduled_departures }
