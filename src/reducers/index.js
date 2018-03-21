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
    case 'GEOCODE_FETCHED':
      return {
        address: action.address,
        location: action.location,
      };
    case 'CHANGE_ERROR_MESSAGE':
      return {
        address: action.message,
        location: { lat: 0, lng: 0 },
      };
    default:
      return state;
  }
};

const hotels = (state = [], action) => {
  console.log('hotels action:', action);
  switch (action.type) {
    case 'CHANGE_HOTELS':
      return action.hotels;
    default:
      return state;
  }
};

const sortKey = (state = 'price', action) => {
  switch (action.type) {
    case 'CHANGE_SORT_KEY':
      return action.sortKey;
    default:
      return state;
  }
};

// 文字列だけじゃなくてオブジェクトとしてexportするように変換
export default combineReducers({
  place, geocodeResult, hotels, sortKey,
});
