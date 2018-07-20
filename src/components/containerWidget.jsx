import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfoWidget from './infoWidget.jsx';
import ContainerGraphArrayWidget from './containerGraphArrayWidget.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import { Actions } from '../store/actions.js';
import store from '../store/store.js';
import request from 'request';
import { typeOfActions } from '../store/actions.js';
import './css/containerWidget.css';


const jsonParsePromise = json => {
  return new Promise((resolve, reject) => {
    try {
      let obj = JSON.parse(json);
      resolve(obj);
    } catch(err) {
      reject(err);
    }
  });
};


class ContainerWidget extends Component {
  constructor(props) {
    super(props);
    this.request = this.request.bind(this);
    this.updateDetail = this.updateDetail.bind(this);
    this.state = {
      detail: null
    };
  }
  componentDidMount() {
    let { type, id } = this.props.match.params;
    Actions.displayStation(true);
    this.request(type, id);
    store.on(typeOfActions.UPDATE_DETAIL, this.updateDetail);
  }
  componentWillReceiveProps(nextProps) {
    let { type, id } = nextProps.match.params;
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.request(type, id);
    } else {
      Actions.loadActivity(false);
    }
  }
  componentWillUnmount() {
    store.removeListener(typeOfActions.UPDATE_DETAIL, this.updateDetail);
    Actions.displayStation(false);
  }
  request(type, id) {
    let url = `${store.apiUrl}/wind-observation/by-name/${type}/${id}/all`;
    request(url, (z, x, a) => {
      jsonParsePromise(a).then( value => {
        Actions.loadActivity(false);
        value.name = value.type + '.' + value.id;
        this.setState({
          detail: value
        });
      }).catch( () => {
        const txt = `Patatra... This ${type} station does not exist.`;
        if(!alert(txt)) {
          this.props.history.push('/');
          Actions.loadActivity(false);
        }
      });
    });
  }
  updateDetail() {
    let { id, type } = this.props.match.params;
    let { idUpdate } = store;
    if (idUpdate === type + '.' + id) {
      let { detail } = this.state;
      detail.items.push(store.windObservation[idUpdate].items[0]);
      this.setState({ detail });
    }
  }
  render() {
    let { type, id } = this.props.match.params;
    const displayDetail = type + '.' + id;
    const {
      rightActive,
      leftActive,
      mobile,
      viewportWidth,
      viewportHeight
    } = store;
    const { detail } = this.state;

    let content = detail ? <div>
      <InfoWidget detail={detail} displayDetail={displayDetail} />
      <ContainerGraphArrayWidget detail={detail} displayDetail={displayDetail} />
    </div>: '';

    let widthContainer;
    let marginLeftContainer;
    if (!leftActive && !rightActive && !mobile) {
      widthContainer = viewportWidth;
      marginLeftContainer = 0;
    } else if (leftActive && !mobile) {
      widthContainer = (viewportWidth - 260) + 'px';
      marginLeftContainer = 260;
    } else if (rightActive && !mobile) {
      widthContainer = (viewportWidth - 260) + 'px';
      marginLeftContainer = 0;
    }

    var heightCoverWidget = {
      height: viewportHeight - 80 + 'px',
      width: widthContainer,
      marginLeft: marginLeftContainer
    };

    return <div id="cover-widgets" style={heightCoverWidget} className={'active'}>
      <Scrollbars style={{height: ( viewportHeight - 80 ) + 'px'}}>
        <div className="container-widgets" id="container-widgets" >
          {displayDetail ? content : ''}
        </div>
      </Scrollbars>
    </div>;
  }
}

ContainerWidget.propTypes = {
  leftActive: PropTypes.bool,
  rightActive: PropTypes.bool,
  displayDetail: PropTypes.any,
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
};

export default ContainerWidget;
