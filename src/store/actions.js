import AppDispatcher from './dispatcher.js';

export var typeOfActions = {
  LEFT_ACTIVATION: 'LEFT_ACTIVATION',
  RIGHT_ACTIVATION: 'RIGHT_ACTIVATION',
  UPDATE_DETAIL: 'UPDATE_DETAIL',
  HOVER_ID: 'HOVER_ID',
  DISPLAY_DETAIL: 'DISPLAY_DETAIL',
  CHANGE_VIEWPORT: 'CHANGE_VIEWPORT',
  DATA_RECEIVED: 'DATA_RECEIVED',
  LOAD_ACTIVITY: 'LOAD_ACTIVITY',
  ADD_BOOKMARK: 'ADD_BOOKMARK',
  CHANGE_SETTINGS: 'CHANGE_SETTINGS'
};

export var Actions = {
  updateDetail(update) {
    AppDispatcher.dispatch({
      actionType: typeOfActions.UPDATE_DETAIL,
      update,
      idUpdate: JSON.parse(update).id
    });
  },
  loadActivity() {
    AppDispatcher.dispatch({
      actionType: typeOfActions.LOAD_ACTIVITY
    });
  },
  leftActivation() {
    AppDispatcher.dispatch({
      actionType: typeOfActions.LEFT_ACTIVATION
    });
  },
  rightActivation() {
    AppDispatcher.dispatch({
      actionType: typeOfActions.RIGHT_ACTIVATION
    });
  },
  hoverId(id) {
    AppDispatcher.dispatch({
      actionType: typeOfActions.HOVER_ID,
      id
    });
  },
  displayDetail(id) {
    AppDispatcher.dispatch({
      actionType: typeOfActions.DISPLAY_DETAIL,
      id
    });
  },
  changeViewport(size) {
    AppDispatcher.dispatch({
      actionType: typeOfActions.CHANGE_VIEWPORT,
      size
    });
  },
  DataReceived() {
    AppDispatcher.dispatch({
      actionType: typeOfActions.DATA_RECEIVED
    });
  },
  addBookmark(id) {
    AppDispatcher.dispatch({
      id,
      actionType: typeOfActions.ADD_BOOKMARK
    });
  },
  changeSettings(object) {
    AppDispatcher.dispatch({
      object,
      actionType: typeOfActions.CHANGE_SETTINGS
    });
  }
};
