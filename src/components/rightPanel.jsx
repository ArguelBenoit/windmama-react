import React from 'react';
import PropTypes from 'prop-types';
import store from '../store/store.js';
import RightPanelInfo from './rightPanelInfo.jsx';
import RightPanelSettings from './rightPanelSettings.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import {Tabs, Tab} from 'material-ui/Tabs';
import './css/panel.css';
import './css/rightPanel.css';


function RightPanel(props) {
  const propsLeftPanel = {
    className: props.rightActive ? ' ' : 'active',
    id: 'right-panel',
    style: {
      height: store.viewportHeight - 80 // viewport height - header height
    }
  };
  const style = {
    iconStyle: {
      color: '#fff'
    },
    tabStyle: {
      background: '#000',
      borderRadius: 0
    }
  };
  return <div {...propsLeftPanel}>
    <Scrollbars style={{height: store.viewportHeight - 80 }} >
      <Tabs>
        <Tab style={style.tabStyle} icon={<i style={style.iconStyle} className="ion-gear-a" />}>
          <RightPanelSettings />
        </Tab>
        <Tab style={style.tabStyle} icon={<i style={style.iconStyle} className="ion-information-circled" />}>
          <RightPanelInfo />
        </Tab>
      </Tabs>
    </Scrollbars>
  </div>;
}

RightPanel.propTypes = {
  rightActive: PropTypes.bool
};

export default RightPanel;
