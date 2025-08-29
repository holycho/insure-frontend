import { SigninResp } from 'app/bff/models/signin';
import { FETCH_MEMBER_PROFILE, FETCH_MEMBER_PROFILE_DONE, RESET_MEMBER, SET_MEMBER_AUTHORIZATION } from './types';
import { MemDetailReq, MemDetailResp } from 'app/bff/models/memDetail';

export const setMemberAuthorizationAction = (authorization: SigninResp) => ({
  type: SET_MEMBER_AUTHORIZATION,
  payload: { authorization }
});

export const resetMemberAction = () => ({
  type: RESET_MEMBER
});

export const fetchMemberProfileAction = (args: MemDetailReq) => ({
  type: FETCH_MEMBER_PROFILE,
  payload: { args }
});

export const fetchMemberProfileDoneAction = (response: MemDetailResp['mem']) => ({
  type: FETCH_MEMBER_PROFILE_DONE,
  payload: { response }
});
