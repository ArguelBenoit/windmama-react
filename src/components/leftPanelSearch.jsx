import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PanelSpot from './panelSpot.jsx';
import moment from 'moment';
import store from '../store/store.js';
import { typeOfActions } from '../store/actions.js';
import _ from 'lodash';

class LeftPanelSearch extends Component {
  constructor(props) {
    super(props);
    this.dataReceived = this.dataReceived.bind(this);
    this.state = {
      search: '',
      nbrSpot: 0
    };
  }
  componentDidMount() {
    store.on(typeOfActions.DATA_RECEIVED, this.dataReceived);
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.DATA_RECEIVED, this.dataReceived);
  }
  dataReceived() {
    const { detail, place } = store;
    this.allId = _.intersection(Object.keys(detail), Object.keys(place));
    this.setState({ nbrSpot: this.allId.length });
  }
  handleChange(e) {
    this.setState({ search: e.target.value });
  }
  render() {
    const { search, nbrSpot } = this.state;
    const { detail, place } = store;

    let spotsList = [];
    if (this.allId && search !== '') {
      this.allId.forEach( id => {
        var idDetail = JSON.parse(detail[id][0]);
        const diff = moment().valueOf() - moment(idDetail.date).valueOf();
        idDetail.avg = idDetail.avg === '--' ? 0 : idDetail.avg;
        idDetail.connected = diff > 3600000 ? false : true;
        idDetail.city = place[id][2] + ' ' + place[id][3] + ' ' + place[id][4];
        idDetail.raw = idDetail.raw ? idDetail.raw : false;

        if (idDetail.city.indexOf(search) >= 0 ||
            idDetail.city.toLowerCase().indexOf(search) >= 0 ||
            idDetail.id.toLowerCase().indexOf(search) >= 0 ||
            idDetail.city.indexOf(search) >= 0 ||
            idDetail.id.indexOf(search) >= 0) {
          spotsList.push(idDetail);
        }

      });

      spotsList.sort((a, b) => {
        if (a.avg < b.avg)
          return 1;
        else if (a.avg > b.avg)
          return -1;
        else
          return -1;
      });

      spotsList = spotsList.slice(0, 60).map((spot) => {
        return <PanelSpot spot={spot} key={spot.id} />;
      });
    }

    return <div>
      <input id="research" type="text" placeholder="Find your spot" value={search} onChange={this.handleChange.bind(this)} />
      <div className="child-container">
        {search !== '' ? spotsList : ''}
        <div style={{display: search !== '' ? 'none' : 'inherit'}}>
          Search into {nbrSpot} places with postal code, city, country code or id.
        </div>
        <div className="error" style={{display: spotsList.length === 60 ? 'inherit' : 'none'}}>
          Windmama show maximum 60 places, please refine your search
        </div>
        <div className="error" style={{display: search !== '' && spotsList.length === 0 ? 'inherit' : 'none'}}>
          We have no results
        </div>
      </div>
    </div>;
  }
}

LeftPanelSearch.propTypes = {
  leftActive: PropTypes.bool
};

export default LeftPanelSearch;