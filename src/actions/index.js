import { geocode } from '../domain/Geocoder.js';
import { searchHotelByLocation } from '../domain/HotelRepository';

// placeをもらってストアから受け取ったdispatchを実行する関数を返す
export const setPlace = place => dispatch => dispatch({ type: 'CHANGE_PLACE', place });

export const setErrorMessage = message => dispatch => dispatch({ type: 'CHANGE_ERROR_MESSAGE', message });

export const setHotels = hotels => dispatch => dispatch({ type: 'CHANGE_HOTELS', hotels });

export const startSearch = () => (dispatch, getState) => {
  // storeがもっているplaceを使う
  geocode(getState().place)
    .then(({ status, address, location }) => {
      switch (status) {
        case 'OK': {
          dispatch({ type: 'GEOCODE_FETCHED', address, location });
          return searchHotelByLocation(location);
        }
        case 'ZERO_RESULTS': {
          dispatch(setErrorMessage('結果が見つかりませんでした'));
          break;
        }
        default: {
          dispatch(setErrorMessage('エラーが発生しました'));
        }
      }
      return [];
    })
    .then((hotels) => {
      dispatch(setHotels(hotels));
    })
    .catch(() => {
      dispatch(setErrorMessage('通信に失敗しました'));
    });
};
