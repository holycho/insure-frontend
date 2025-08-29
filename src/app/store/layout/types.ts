import { LinkUrlResp } from 'app/bff/models/linkUrl';

export interface LayoutState {
  header: LinkUrlResp['header'];
  footer: LinkUrlResp['footer'];
}

// Actions type constant
export const LAYOUT__INITIAL_HEADER_AND_FOOTER = 'LAYOUT__INITIAL_HEADER_AND_FOOTER';
export const LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE = 'LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE';
// ::: End

export interface InitialHeaderAndFooterAction {
  type: typeof LAYOUT__INITIAL_HEADER_AND_FOOTER;
}

export interface InitialHeaderAndFooterDoneAction {
  type: typeof LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE;
  payload: {
    response: LinkUrlResp;
  }
}

export type LayoutActions =
  InitialHeaderAndFooterAction |
  InitialHeaderAndFooterDoneAction;
