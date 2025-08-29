import { Reducer } from 'redux';
import { UI_DIALOGS_SET_DIALOG_VISIBLE, UIActions, UIState } from './types';

const initialState: UIState = {
  dialogs: {
    loginDialogVisible: false
  }
};

const UIReducer: Reducer<UIState, UIActions> = (state = initialState, action): UIState => {
  switch (action.type) {
    case UI_DIALOGS_SET_DIALOG_VISIBLE:
      return { ...state, dialogs: { ...state.dialogs, [ `${action.payload.dialogName}Visible` ]: action.payload.visible } };
    default:
      return state;
  }
};

export default UIReducer;
