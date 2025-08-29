import { useSelector } from 'react-redux';
import { /* useHistory, */ useLocation } from 'react-router-dom';
import { RootState } from 'app/store/types';
import { ROUTES } from 'app/core/router/routerPaths';
import { ListRouteLocationState } from 'app/features/Service/Payment/List/types';

export const useServicePaymentListGuard = () => {
  const routerLocation = useLocation<ListRouteLocationState>();
  // const routerHistory = useHistory();
  const memberState = useSelector((state: RootState) => state.system.member);
  const authorizationState = memberState.authorization;
  const nonMemberId = routerLocation.state?.id;
  const applyNo = routerLocation.state?.applyNo;
  const isAccessible = !!(authorizationState || (nonMemberId && applyNo));

  // (React v18) 若在此處呼叫 routerHistory.replace() 則會判定為 React FC 元件並跳出下列警告，故改用原生 location 處理跳轉
  // 警告: Cannot update during an existing state transition (such as within `render`).
  // Render methods should be a pure function of props and state.
  // if (!isAccessible) routerHistory.replace(ROUTES.HOME__MAIN);

  if (!isAccessible) window.location.replace(ROUTES.HOME__MAIN);
  return isAccessible;
};