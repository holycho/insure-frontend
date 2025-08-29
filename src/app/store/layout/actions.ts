import { LinkUrlResp } from 'app/bff/models/linkUrl';
import { LAYOUT__INITIAL_HEADER_AND_FOOTER, LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE, LayoutActions } from './types';

export const initialHeaderAndFooterAction = (): LayoutActions => ({
  type: LAYOUT__INITIAL_HEADER_AND_FOOTER
});

export const initialHeaderAndFooterDoneAction = (response: LinkUrlResp): LayoutActions => ({
  type: LAYOUT__INITIAL_HEADER_AND_FOOTER_DONE,
  payload: { response }
});
