import store from '../store/store.js';

const windUnit = (value) => {
  const { windUnit } = store.settings;
  if ( value == null ) {
    return '--';
  } else if(windUnit === 'km/h') {
    const valueInKM = Math.round(value);
    return Math.round(valueInKM);
  } else if (windUnit === 'kts') {
    const valueInKT = Math.round(value/1.852);
    return valueInKT;
  } else if (windUnit === 'm/s') {
    const valueInMS = Math.round(value/3.6);
    return valueInMS;
  }
};

export default windUnit;
