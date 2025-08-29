import { MemDetailReq, MemDetailResp } from 'app/bff/models/memDetail';
import { SigninResp } from 'app/bff/models/signin';

export interface SystemState {
  member: {
    authorization?: SigninResp;
    profile?: MemDetailResp['mem'];
  }
}

export const SET_MEMBER_AUTHORIZATION = 'SET_MEMBER_AUTHORIZATION';
export const FETCH_MEMBER_PROFILE = 'FETCH_MEMBER_PROFILE';
export const FETCH_MEMBER_PROFILE_DONE = 'FETCH_MEMBER_PROFILE_DONE';
export const RESET_MEMBER = 'RESET_MEMBER';

export interface SetMemberAuthorizationAction {
  type: typeof SET_MEMBER_AUTHORIZATION;
  payload: {
    authorization: SigninResp;
  }
}

export interface FetchMemberProfileAction {
  type: typeof FETCH_MEMBER_PROFILE;
  payload: {
    args: MemDetailReq;
  }
}

export interface FetchMemberProfileDoneAction {
  type: typeof FETCH_MEMBER_PROFILE_DONE;
  payload: {
    response: MemDetailResp['mem'];
  }
}

export interface ResetMemberAction {
  type: typeof RESET_MEMBER;
}

export type SystemActions =
  SetMemberAuthorizationAction |
  FetchMemberProfileAction |
  FetchMemberProfileDoneAction |
  ResetMemberAction;
