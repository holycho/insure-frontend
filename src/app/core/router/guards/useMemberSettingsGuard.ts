import { SettingsRouteMatchesStep } from 'app/features/Member/Settings/types';
import { RootState } from 'app/store/types';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../routerPaths';

const useMemberSettingsGuard = () => {
  const routerLocation = useLocation();
  const routerHistory = useHistory();
  const settingsState = useSelector((state: RootState) => state.member.settings);
  // 檢測當前路由是否在可存取的步驟內
  const currentStep = SettingsRouteMatchesStep[routerLocation.pathname];
  const isAccessible = settingsState.accessibleSteps.includes(currentStep);
  if (!isAccessible) routerHistory.replace(ROUTES.MEMBER__SETTINGS);
  return isAccessible;
};

export default useMemberSettingsGuard;