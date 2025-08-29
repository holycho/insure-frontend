export interface UIState {
  dialogs: DialogState;
};

interface DialogState {
  loginDialogVisible: boolean;
};

export const UI_DIALOGS_SET_DIALOG_VISIBLE = 'UI_DIALOGS_SET_DIALOG_VISIBLE';

export interface SetDialogVisibleAction {
  type: typeof UI_DIALOGS_SET_DIALOG_VISIBLE;
  payload: {
    dialogName: string;
    visible: boolean;
  }
}

export type UIActions = SetDialogVisibleAction;