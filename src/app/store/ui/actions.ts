import { UI_DIALOGS_SET_DIALOG_VISIBLE, UIActions } from './types';

export const setDialogVisibleAction = (dialogName: string, visible: boolean): UIActions => ({
  type: UI_DIALOGS_SET_DIALOG_VISIBLE,
  payload: {
    dialogName,
    visible
  }
});
