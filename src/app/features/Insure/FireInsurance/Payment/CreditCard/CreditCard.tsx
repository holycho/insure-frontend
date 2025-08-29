import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ROUTES } from 'app/core/router';
import commonService from 'app/core/services/commonService';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import CreditCardField from 'app/common/compoments/Field/CreditCardField';
import { CreditCardFormValues } from './types';
import CreditCardExpireField from 'app/common/compoments/Field/CreditCardExpireField';
import CreditCardScodeField from 'app/common/compoments/Field/CreditCardScodeField';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentResultAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { StepCodesEnum } from '../../types';
import { RootState } from 'app/store/types';
import apiService from 'app/bff/services/apiService';
import { PaymentReq } from 'app/bff/models/payment';

const CreditCard: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const fireState = useSelector((state: RootState) => state.insure.fireInsurance);
  const policyState = fireState.policy;

  // Formik Config
  const formik = useFormik<CreditCardFormValues>({
    initialValues: {
      ccNo1st: '',
      ccNo2nd: '',
      ccNo3rd: '',
      ccNo4th: '',
      ccExpireMM: '',
      ccExpireYY: '',
      ccScode: ''
    },
    validationSchema: Yup.object().shape({
      ccNo1st: Yup.string().required('此為必填欄位'),
      ccNo2nd: Yup.string().required('此為必填欄位'),
      ccNo3rd: Yup.string().required('此為必填欄位'),
      ccNo4th: Yup.string().required('此為必填欄位'),
      ccExpireMM: Yup.string().required('此為必填欄位'),
      ccExpireYY: Yup.string().required('此為必填欄位'),
      ccScode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: CreditCardFormValues) => {
      if (!policyState) return;
      const args: PaymentReq = {
        payBy: '5',
        planType: 'fire',
        applyNo: policyState.applyNo,
        amount: policyState.amount,
        paymentData: {
          ccNo: `${values.ccNo1st}${values.ccNo2nd}${values.ccNo3rd}${values.ccNo4th}`,
          ccExpire: `${values.ccExpireMM}${values.ccExpireYY}`,
          ccScode: values.ccScode
        }
      };
      // 繳費
      const response = await apiService.postPayment(args);
      if (response) {
        // 緩存繳費結果
        reduxDispatch(savePaymentResultAction(response));
        // 啟用下一步權限
        reduxDispatch(setAccessiableStepAction(StepCodesEnum.Complete));
        // 跳轉至投保完成頁
        routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__COMPLETE);
      }
    }
  });

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  // const handlePayClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__COMPLETE);
  // };

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT);
  };

  const handleTransferClick = () => {
    // 信用卡與轉帳同層，故替換處理
    routerHistory.replace(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER);
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              信用卡繳費
            </div>
            <div className="form-layout-00__title-descrp">
              僅限本人信用卡
            </div>

            <div className="form-layout-00__body">
              <div className="arounding-text-00">
                <div className="arounding-text-00__ul">
                  <div className="arounding-text-00__floating-item">
                    <img src="/assets/img/TWCASSL.png" alt="" className="img" />
                  </div>
                  <div className="arounding-text-00__li">
                    <span className="arounding-text-00__text">本次投保的被保險人、要保人及持卡人必須為同一人。</span>
                    {/* <a href="#"
                      className="arounding-text-00__text arounding-text-00__text--link arounding-text-00__text--iblock">查看我的信用卡是否適用網路投保</a> */}
                  </div>
                  <div className="arounding-text-00__li">
                    <span
                      className="arounding-text-00__text">為保障您的交易安全，蓮花保險線上繳費服務檔案傳輸軟體遵循JSSE標準，採取傳輸過程加密(SSL加密)標準之TLSv1.2加密，且不會記錄您的信用卡背面末3碼，敬請安心使用。</span>
                  </div>
                  <div className="arounding-text-00__li">
                    <span className="arounding-text-00__text">目前澳盛銀行、美國運通暫時未參與此服務。</span>
                  </div>
                </div>
              </div>
              <div className="credit-card-form-00">
                <div className="credit-card-form-00__card credit-card-form-00-card">
                  <div className="credit-card-form-00-card__front">
                    <div className="credit-card-form-00-card__visa">
                      <img className="img" src="/assets/img/visa.svg" alt="" />
                    </div>
                    <div className="credit-card-form-00-card__card-number-section">
                      <div className="credit-card-form-00-card__row">
                        <div className="credit-card-form-00-card__card-number"></div>
                        <div className="credit-card-form-00-card__card-number"></div>
                        <div className="credit-card-form-00-card__card-number"></div>
                        <div className="credit-card-form-00-card__card-number"></div>
                      </div>
                    </div>
                    <div className="credit-card-form-00-card__ex-date-section">
                      <div className="credit-card-form-00-card__ex-date-title">
                        有效期限
                      </div>
                      <div className="credit-card-form-00-card__row">
                        <div className="credit-card-form-00-card__ex-date"></div>
                        <div className="credit-card-form-00-card__slash">/</div>
                        <div className="credit-card-form-00-card__ex-date"></div>
                      </div>
                    </div>
                  </div>
                  <div className="credit-card-form-00-card__back">
                    <div className="credit-card-form-00-card__safe-code-section">
                      <div className="credit-card-form-00-card__safe-code-title">安全碼</div>
                      <div className="credit-card-form-00-card__safe-code"></div>
                    </div>
                  </div>
                </div>
                <div className="credit-card-form-00__form credit-card-form-00-form">
                  <div className="credit-card-form-00-form__section">
                    <div className="credit-card-form-00-form__title-tag">金額</div>
                    <div className="credit-card-form-00-form__row">
                      <div className="credit-card-form-00-form__cell credit-card-form-00-form__cell--auto">
                        <div
                          className="credit-card-form-00-form__value-text credit-card-form-00-form__value-text--highlight">
                          NT$ {commonService.thousandFormat(policyState?.amount ?? '0')}
                        </div>
                      </div>
                    </div>
                    {/* <div className="credit-card-form-00-form__error-tag error-tag">錯誤訊息</div> */}
                  </div>
                  {/* 卡號 */}
                  <CreditCardField
                    no1stFName="ccNo1st"
                    no2ndFName="ccNo2nd"
                    no3rdFName="ccNo3rd"
                    no4thFName="ccNo4th"
                  />
                  {/* 到期年月 */}
                  <CreditCardExpireField
                    mmFName="ccExpireMM"
                    yyFName="ccExpireYY"
                  />
                  {/* 安全碼 */}
                  <CreditCardScodeField name="ccScode" />
                </div>
              </div>
              <div className="form-layout-00__btn-wrapper">
                <button type="submit" className="form-layout-00__btn btn-primary btn-primary">
                  確認付款
                </button>
              </div>
            </div>
          </div>

          <div className="inside-page-01-layout__btn-wrapper function-toggle-btn-comp">
            <div className="function-toggle-btn-comp__inner">
              <div className="function-toggle-btn-comp__descrp">
                還是你要？
              </div>
              <div className="function-toggle-btn-comp__wrapper function-toggle-btn-wrapper">
                <div className="function-toggle-btn-wrapper__former">
                  <button type="button" className="function-toggle-btn-wrapper__link btn-text" onClick={handlePrevClick}>
                    返回上一步
                  </button>
                </div>
                <div className="function-toggle-btn-wrapper__center">
                  <button type="button" className="function-toggle-btn-wrapper__btn btn-secondary-2" onClick={handleTransferClick}>帳戶轉帳</button>
                </div>
              </div>
            </div>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default CreditCard;
