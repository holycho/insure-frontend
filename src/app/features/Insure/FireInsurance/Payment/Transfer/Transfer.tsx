import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from 'app/core/router';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import * as Yup from 'yup';
import commonService from 'app/core/services/commonService';
import { RootState } from 'app/store/types';
import { resetProcessAction, savePaymentResultAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { StepCodesEnum } from '../../types';
import { PaymentReq } from 'app/bff/models/payment';
import apiService from 'app/bff/services/apiService';
// import Select02 from 'app/common/compoments/Element/Select/Select02';
import Select02Field from 'app/common/compoments/Field/Select02Field';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import ArticleDisplayer00 from 'app/common/compoments/ArticleDisplayer/ArticleDisplayer00';
import PaymentTransferNotice from 'app/common/compoments/Notices/PaymentTransferNotice';
import AgreementField from 'app/common/compoments/Field/AgreementField/AgreementField';
import { OptionProps, TransferFormValues } from './types';

const Transfer: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const fireState = useSelector((state: RootState) => state.insure.fireInsurance);
  const policyState = fireState.policy;
  const bankState = useSelector((state: RootState) => state.insure.fireInsurance.static.transferBank);
  const [bankOptions, setBankOptions] = useState<OptionProps[]>([]);

  // Formik Config
  const formik = useFormik<TransferFormValues>({
    initialValues: {
      caBankCode: '',
      caBankName: '',
      caAccountNo: '',
      caTermReaded: false,
      caTermAgreeTime: ''
    },
    validationSchema: Yup.object().shape({
      caBankCode: Yup.string().required('此為必填欄位'),
      caBankName: Yup.string(),
      caAccountNo: Yup.string().required('此為必填欄位'),
      caTermReaded: Yup.boolean().oneOf([true]),
      caTermAgreeTime: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: TransferFormValues) => {
      if (!policyState) return;
      const args: PaymentReq = {
        payBy: '6',
        planType: 'fire',
        applyNo: policyState.applyNo,
        amount: policyState.amount,
        paymentData: {
          caBankCode: values.caBankCode,
          caBankName: values.caBankName,
          caAccountNo: values.caAccountNo,
          caTermAgreeTime: values.caTermAgreeTime
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

    return () => {
      // 若不是投保流程路由則執行重置
      if (!routerHistory.location.pathname.includes(ROUTES.INSURE__FIRE_INSURANCE)) {
        reduxDispatch(resetProcessAction());
      }
    };
  }, [reduxDispatch, routerHistory.location.pathname]);

  useEffect(() => {
    if (bankState.length > 0) {
      const _bank = bankState.map(it => ({ value: it.bankCode, text: it.bankName }));
      _bank.unshift({ value: '', text: '請選擇' });
      setBankOptions(_bank);
    }
  }, [bankState]);

  useEffect(() => {
    if (formik.values.caBankCode) {
      const find = bankState.find(it => it.bankCode === formik.values.caBankCode);
      if (find) {
        formik.setFieldValue('caBankName', find.bankName);
      }
    }
    // eslint-disable-next-line
  }, [formik.values.caBankCode]);

  // const handlePayClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__COMPLETE);
  // };

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT);
  };

  const handleCreditCardClick = () => {
    // 信用卡與轉帳同層，故替換處理
    routerHistory.replace(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD);
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              帳戶轉帳
            </div>
            <div className="form-layout-00__title-descrp">
              僅限本人存款帳戶
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">金額</div>
                <div className="form-layout-00__row">
                  <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                    <div className="form-layout-00__value-text form-layout-00__value-text--highlight">
                      NT$ {commonService.thousandFormat(policyState?.amount ?? '0')}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">轉出銀行</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--mobile-response' + (formik.errors.caBankCode && formik.touched.caBankCode ? ' form-layout-00__cell' : '')}>
                    <Select02Field name="caBankCode" options={bankOptions} />
                    <ErrorMessage name="caBankCode" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
                <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">測試銀行: 000</div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">轉出帳號</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--mobile-response' + (formik.errors.caAccountNo && formik.touched.caAccountNo ? ' form-layout-00__cell--error' : '')}>
                    <Text00Field name="caAccountNo" maxLength={14} />
                    <ErrorMessage name="caAccountNo" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
                <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">測試帳戶: 00000000000000</div>
              </div>
              <div className="form-layout-00__section">
                <ArticleDisplayer00 title="注意事項" name="caTermReaded">
                  <PaymentTransferNotice />
                </ArticleDisplayer00>
              </div>
              <div className="form-layout-00__section">
                <AgreementField id="caTermAgreeTime" name="caTermAgreeTime" disabled={!formik.values.caTermReaded} />
              </div>
              <div className="form-layout-00__btn-wrapper">
                <button type="submit" className={'form-layout-00__btn btn-primary' + (!formik.values.caTermAgreeTime ? ' btn-primary--disabled' : '')} disabled={!formik.values.caTermAgreeTime}>
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
                  <button className="function-toggle-btn-wrapper__link btn-text" onClick={handlePrevClick}>
                    返回上一步
                  </button>
                </div>
                <div className="function-toggle-btn-wrapper__center">
                  <button className="function-toggle-btn-wrapper__btn btn-secondary-2" onClick={handleCreditCardClick}>信用卡</button>
                </div>
              </div>
            </div>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default Transfer;
