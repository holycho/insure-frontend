import React from 'react';
import { OTPAuthFormValues } from './types';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import CaptchaField from 'app/common/compoments/Field/CaptchaField';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { fetchLoginCaptchaAction, setLoginServiceStepAction, signinAction } from 'app/store/member/login/actions';
import { LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { SigninReq } from 'app/bff/models/signin';
import { ROUTES } from 'app/core/router';

const OTPAuth: React.FC = () => {
  const reduxDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.member.login);

  const initialValues: OTPAuthFormValues = {
    otpCode: ''
  };

  const formik = useFormik<OTPAuthFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      otpCode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: (values: OTPAuthFormValues) => {
      if (!loginState.data || !loginState.otp) return;
      const args: SigninReq = {
        ...values,
        memberId: loginState.data.memberId,
        memberSn: loginState.otp.memberSn
      };
      reduxDispatch(signinAction(args, ROUTES.SERVICE__QUERY_POLICY__LIST));
    }
  });

  /**
   * @description 處理「上一步」執行的事件
   */
  const handlePrevStep = () => {
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
      <div className="form-layout-outer-00__descrp">請先登入有助於您的保單查詢</div>
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">會員登入</div>
              <div className="form-layout-00__body">
                <CaptchaField name="otpCode" duration={30} onResend={handleResendCaptcha} />
              </div>
              <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
                <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                  返回上一步
                </button>
                <button type="submit" className="inside-page-01-layout__btn btn-primary">
                  登入
                </button>
              </div>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default OTPAuth;