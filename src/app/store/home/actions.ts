import { HomeActions, HomeState, INITIAL_HOME_MAIN, INITIAL_HOME_MAIN_DONE } from './types';

export const initialHomeMainAction = (): HomeActions => ({
  type: INITIAL_HOME_MAIN
});

export const initialHomeMainDoneAction = (response: HomeState['main']): HomeActions => ({
  type: INITIAL_HOME_MAIN_DONE,
  payload: { response }
});
