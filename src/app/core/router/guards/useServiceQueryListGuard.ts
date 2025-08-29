import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'app/core/router/routerPaths';
import { RootState } from 'app/store/types';
import { ListRouteLocationState } from 'app/features/Service/QueryPolicy/List/types';

export const useServiceQueryListGuard = () => {
  const routerLocation = useLocation<ListRouteLocationState>();
  const memberState = useSelector((state: RootState) => state.system.member);
  const authorizationState = memberState.authorization;
  const nonMemberId = routerLocation.state?.id;
  const applyNo = routerLocation.state?.applyNo;
  const isAccessible = !!(authorizationState || (nonMemberId && applyNo));
  if (!isAccessible) window.location.replace(ROUTES.HOME__MAIN);
  return isAccessible;
};