import { RegisterRouteMatchesStep, RegisterStepCodesEnum, RegisterStepMatchesRoute } from 'app/features/Member/Register/types';
import { RootState } from 'app/store/types';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash'; 

const useMemberRegisterGuard = () => {
  const routerHistory = useHistory(); // 為了導頁
  const routerLocation = useLocation(); // 取得當前路由
  const registerState = useSelector((state: RootState) => state.member.register);
  const currentStep = RegisterRouteMatchesStep[routerLocation.pathname];
  const isAccessible = registerState.accessibleSteps.includes(currentStep);
  if (!isAccessible) {
    // 導頁至最後一筆步驟之路由
    routerHistory.replace(RegisterStepMatchesRoute[_.last(registerState.accessibleSteps) as RegisterStepCodesEnum]);
  }
  return isAccessible;
};

export default useMemberRegisterGuard;
