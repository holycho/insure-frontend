import { BannerResp } from 'app/bff/models/banner';
import { NewsListResp } from 'app/bff/models/news/list';
import { PromoListResp } from 'app/bff/models/promo/list';

export interface HomeState {
  main: MainState;
}

export interface MainState {
  banner: BannerResp['banner'];
  news: NewsListResp;
  promo: PromoListResp;
}

export const INITIAL_HOME_MAIN = 'INITIAL_HOME_MAIN';
export const INITIAL_HOME_MAIN_DONE = 'INITIAL_HOME_MAIN_DONE';

export interface InitialHomeMainAction {
  type: typeof INITIAL_HOME_MAIN;
}

export interface InitialHomeMainDoneAction {
  type: typeof INITIAL_HOME_MAIN_DONE;
  payload: {
    response: HomeState['main'];
  }
}

export type HomeActions =
    InitialHomeMainAction
  | InitialHomeMainDoneAction;