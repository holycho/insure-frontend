import { Reducer } from 'redux';
import { ACTIVITY__FETCH_NEWS_DETAIL_DONE, ACTIVITY__INITIAL_NEWS_DONE, ACTIVITY__INITIAL_PROMO_DONE, ActivityActions, ActivityState, ACTIVITY__FETCH_PROMO_DETAIL_DONE } from './types';

const initialState: ActivityState = {
  news: {
    totalCount: 0,
    list: []
  },
  promo: {
    totalCount: 0,
    list: []
  }
};

const activityReducer: Reducer<ActivityState, ActivityActions> = (state = initialState, action): ActivityState => {
  switch(action.type) {
    // 取得最新消息列表 完成
    case ACTIVITY__INITIAL_NEWS_DONE: {
      return { ...state, news: { ...state.news, totalCount: action.payload.totalCount, list: action.payload.list } };
    }
    // 取得最新消息明細 完成
    case ACTIVITY__FETCH_NEWS_DETAIL_DONE: {
      return { ...state, news: { ...state.news, detail: action.payload.response } };
    }
    // 取得熱門活動列表 完成
    case ACTIVITY__INITIAL_PROMO_DONE: {
      return { ...state, promo: { ...state.promo, totalCount: action.payload.totalCount, list: action.payload.list } };
    }
    // 取得熱門活動明細 完成
    case ACTIVITY__FETCH_PROMO_DETAIL_DONE: {
      return { ...state, promo: { ...state.promo, detail: action.payload.response } };
    }
    default:
      return state;
  }
};

export default activityReducer;
