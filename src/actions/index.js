import { geocode } from '../domain/Geocoder.js';
// import { searchHotelByLocation } from '../domain/HotelRepository';

// placeをもらってストアから受け取ったdispatchを実行する関数を返す
export const setPlace = place => dispatch => dispatch({ type: 'CHANGE_PLACE', place });

export const startSearch = () => (dispatch, getState) => {
  // storeがもっているplaceを使う
  geocode(getState().place)
    .then(({ status, address, location }) => {
      switch (status) {
        case 'OK': {
          dispatch({ type: 'GEOCODE_FETCHED', address, location });
          //      return searchHotelByLocation(location);
          break;
        }
        case 'ZERO_RESULTS': {
          //       this.setErrorMessage('結果が見つかりませんでした');
          break;
        }
        default: {
          // this.setErrorMessage('エラーが発生しました');
        }
      }
      return [];
    });
  //   .then((hotels) => {
  //     this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
  //   })
  //   .catch(() => {
  //     this.setErrorMessage('通信にエラーが発生しました');
  //   });
};
