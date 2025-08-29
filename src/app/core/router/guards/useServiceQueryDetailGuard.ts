import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { ROUTES } from '../routerPaths';
import { DetailRouteLocationState } from 'app/features/Service/QueryPolicy/Detail/types';

const useServiceQueryDetailGuard = () => {
  const routerLocation = useLocation<DetailRouteLocationState>();
  const routerHistory = useHistory();
  const memberState = useSelector((state: RootState) => state.system.member);
  const authorizationState = memberState.authorization;
  const nonMemberIdState = routerLocation.state?.id;
  console.log(authorizationState, nonMemberIdState);
  const isAccessible = !!(authorizationState || nonMemberIdState);
  if (!isAccessible) routerHistory.replace(ROUTES.HOME__MAIN);
  return isAccessible;
};

export default useServiceQueryDetailGuard;
