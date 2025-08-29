import { Reducer } from 'redux';
import { HomeActions, HomeState, INITIAL_HOME_MAIN_DONE } from './types';

const initialState: HomeState = {
  main: {
    banner: [],
    news: {
      totalCount: 0,
      news: [],
      moreUrl: []
    },
    promo: {
      totalCount: 0,
      promo: [],
      moreUrl: []
    }
  }
};

const homeReducer: Reducer<HomeState, HomeActions> = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_HOME_MAIN_DONE: {
      return { ...state, main: action.payload.response };
    }
    default:
      return state;
  }
};

export default homeReducer;