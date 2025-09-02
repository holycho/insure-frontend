import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { RootState } from 'app/store/types';
import { ROUTES } from 'app/core/router';
import { fetchLoginCaptchaAction, sendLoginOTPAction } from 'app/store/member/login/actions';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import CaptchaCanvas from 'app/common/compoments/CaptchaCanvas';
import { LoginFormValues, LoginProps } from './types';

const Login: React.FC<LoginProps> = (props) => {
  const reduxDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.member.login);

  // 表單初始值
  const initialValues: LoginFormValues = {
    memberId: '',
    captchaCode: ''
  };

  // Formik Config
  const formik = useFormik<LoginFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      memberId: Yup.string().required('此為必填欄位'),
      captchaCode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: LoginFormValues) => {
      if (!loginState.captcha) return;
      // 執行發送 OTP
      reduxDispatch(sendLoginOTPAction({
        memberId: values.memberId,
        captchaSn: loginState.captcha.captchaSn,
        captchaCode: values.captchaCode
      }, true));
    }
  });

  useEffect(() => {
    reduxDispatch(fetchLoginCaptchaAction());
  }, [reduxDispatch]);

  /**
   * @description 重新發送圖形驗證碼
   */
  const handleResendCaptcha = () => {
    reduxDispatch(fetchLoginCaptchaAction());
  };

  return (
    <div className="form-layout-outer-00">
      <div className="form-layout-outer-00__descrp">
        {props.desc ?? ''}
      </div>
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">會員登入</div>
              <div className="form-layout-00__body">
                {/* 身分證字號 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">身分證字號</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.memberId && formik.touched.memberId ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="memberId" placeholder="請輸入" />
                      <ErrorMessage name="memberId" render={(errMsg) => (
                        <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                  <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">內建測試帳號登入: A151273978</div>
                </div>
                {/* 圖形驗證碼 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">圖形驗證碼</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.captchaCode && formik.touched.captchaCode ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="captchaCode" placeholder="需區分大小寫" />
                      <ErrorMessage name="captchaCode" render={(errMsg) => (
                        <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                    <div className="form-layout-00__verify-code">
                      <CaptchaCanvas width={135} height={34} code={loginState.captcha?.captchaCode ?? ''} />
                    </div>
                    <button type="button" className="form-layout-00__refresh" onClick={handleResendCaptcha}>
                      <img src="/assets/img/refresh-p.svg" alt="" className="img" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout__btn-wrapper--column">
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                登入
              </button>
              <Link to={ROUTES.HOME__MAIN} className="inside-page-01-layout__btn btn-text">
                新會員註冊
              </Link>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
