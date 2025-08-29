import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { RootState } from 'app/store/types';
import { RouteMatchesStep, StepCodesEnum, StepMatchesRoute } from 'app/features/Insure/FireInsurance/types';

// 路由守衛
export const useInsureFireInsuranceGuard = () => {
  const routerLocation = useLocation();
  const routerHistory = useHistory();
  const fireState = useSelector((state: RootState) => state.insure.fireInsurance);
  const currentStep = RouteMatchesStep[routerLocation.pathname];
  // 若步驟不再緩存的佇列內。表示仍不可存取
  const isAccessible = fireState.process.accessibleSteps.includes(currentStep);
  if (!isAccessible) routerHistory.replace(StepMatchesRoute[_.last(fireState.process.accessibleSteps) as StepCodesEnum]);
  return isAccessible;
};
