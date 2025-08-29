import { Reducer } from 'redux';
import { LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE, LayoutActions, LayoutState } from './types';

const initialState: LayoutState = {
  header: [],
  footer: []
};

const layoutReducer: Reducer<LayoutState, LayoutActions> = (state = initialState, action) => {
  switch(action.type) {
    case LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE:
      return { ...state, ...action.payload.response };
    default:
      return state;
  }
};

export default layoutReducer;
