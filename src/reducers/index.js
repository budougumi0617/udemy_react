import { combineReducers } from 'redux';

// オブジェクトでなく文字列を返すだけ
const place = (state = '東京タワー', action) => {
  console.log('action:', action);
  switch (action.type) {
    case 'CHANGE_PLACE':
      return action.place;
    default:
      return state;
  }
};

const geocodeResult = (
  state = {
    address: '',
    location: { lat: 35.6585805, lng: 139.7454329 },
  },
  action,
) => {
  console.log('action:', action);
  switch (action.type) {
    case 'CHANGE_PLACE':
      return action.place;
    default:
      return state;
  }
};


// 文字列だけじゃなくてオブジェクトとしてexportするように変換
export default combineReducers({ place, geocodeResult });
