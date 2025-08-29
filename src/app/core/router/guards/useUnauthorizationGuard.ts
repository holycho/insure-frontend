import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'app/store/types';
import { ROUTES } from '../routerPaths';

export const useUnauthorizationGuard = (route: string) => {
  const routerHistory = useHistory();
  const authorization = useSelector((state: RootState) => state.system.member.authorization);
  const isAccessible = !authorization; // 「未驗身」狀態為可存取
  if (!isAccessible && route === routerHistory.location.pathname) {
    // 當前路徑與此路由一致，方可跳轉
    routerHistory.replace(ROUTES.HOME__MAIN);
  }
  return isAccessible;
};