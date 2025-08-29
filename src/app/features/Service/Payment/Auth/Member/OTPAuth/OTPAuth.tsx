import React from 'react';
import { OTPAuthFormValues } from './types';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import CaptchaField from 'app/common/compoments/Field/CaptchaField';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginCaptchaAction, setLoginServiceStepAction, signinAction } from 'app/store/member/login/actions';
import { LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { RootState } from 'app/store/types';
import { ROUTES } from 'app/core/router';
import { SigninReq } from 'app/bff/models/signin';

const OTPAuth: React.FC = () => {
  const reduxDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.member.login);

  // 表單初始值
  const initialValues: OTPAuthFormValues = {
    otpCode: ''
  };

  // Formik Config
  const formik = useFormik<OTPAuthFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      otpCode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: OTPAuthFormValues) => {
      if (!loginState.data || !loginState.otp) return;
      // 登入後轉跳列表頁
      const { memberId } = loginState.data;
      const { memberSn } = loginState.otp;
      const args: SigninReq = {
        ...values,
        memberId,
        memberSn
      };
      reduxDispatch(signinAction(args, ROUTES.SERVICE__PAYMENT__LIST));
    }
  });

  /**
   * @description 處理「上一步」執行的事件
   */
  const handlePrevStep = () => {
    // 返回上一步 (Step-1)
    reduxDispatch(setLoginServiceStepAction(LoginStepCodesEnum.Authentication));
  };

  /**
   * @description 重新發送圖形驗證碼
   */
  const handleResendCaptcha = () => {
    reduxDispatch(fetchLoginCaptchaAction());
  };

  return (
    <div className="form-layout-outer-00">
      <div className="form-layout-outer-00__descrp">請先登入有助於您的繳費查詢</div>
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">會員登入</div>
              <div className="form-layout-00__body">
                <CaptchaField name="otpCode" duration={30} onResend={handleResendCaptcha} />
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
              <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                返回上一步
              </button>
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                登入
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default OTPAuth;
