import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { routerHistory } from 'app/core/router/service';
import UIReducer from 'app/store/ui/reducer';
import insureFireInsuranceReducer from 'app/store/insure/fireInsurance/reducer';
import loginReducer from './member/login/reducer';
import settingsReducer from './member/settings/reducer';
import registerReducer from './member/register/reducer';
import systemReducer from './system/reducer';
import layoutReducer from './layout/reducer';
import paymentReducer from './service/payment/reducer';
import queryPolicyReducer from './service/queryPolicy/reducer';
import homeReducer from './home/reducer';
import activityReducer from './activity/reducer';

/**
 * 說明: connected-react-router 實作了在 redux 內操作路由方法，並且將路由變動的資訊儲存於 store 內，同步了 router 與 store
 *       v6 僅支援 react-router-dom v4/v5
 */
const rootReducer = combineReducers({
  router: connectRouter(routerHistory),
  UI: UIReducer,
  activity: activityReducer,
  home: homeReducer,
  member: combineReducers({
    login: loginReducer,
    settings: settingsReducer,
    register: registerReducer
  }),
  insure: combineReducers({
    fireInsurance: insureFireInsuranceReducer
  }),
  system: systemReducer,
  layout: layoutReducer,
  service: combineReducers({
    payment: paymentReducer,
    queryPolicy: queryPolicyReducer
  })
});

export default rootReducer;
