import { Reducer } from 'redux';
import { FETCH_MEMBER_PROFILE_DONE, RESET_MEMBER, SET_MEMBER_AUTHORIZATION, SystemActions, SystemState } from './types';
import storageService from 'app/core/services/storageService';
import { StorageKeysEnum } from 'app/core/enum/storage';

const initialState: SystemState = {
  member: {
    authorization: JSON.parse(storageService.getItem(StorageKeysEnum.Authorization)!) ?? undefined
  }
};

const systemReducer: Reducer<SystemState, SystemActions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER_AUTHORIZATION: {
      return { ...state, member: { authorization: action.payload.authorization } };
    }
    case RESET_MEMBER: {
      return { ...state, member: { ...initialState.member, authorization: undefined } };
    }
    case FETCH_MEMBER_PROFILE_DONE: {
      return { ...state, member: { ...state.member, profile: action.payload.response } };
    }
    default:
      return state;
  }
};

export default systemReducer;
