import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import * as Yup from 'yup';
import commonService from 'app/core/services/commonService';
import { ClausesFormValues } from './types';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import RadioField from 'app/common/compoments/Field/RadioField';
import { RootState } from 'app/store/types';
import { useDispatch, useSelector } from 'react-redux';
import ArticleDisplayer00 from 'app/common/compoments/ArticleDisplayer/ArticleDisplayer00';
import InsuranceAndPersonalNoticeClause from 'app/common/compoments/Clauses/InsuranceAndPersonalNoticeClause';
import InsuranceClause from 'app/common/compoments/Clauses/InsuranceClause';
import AgreementField from 'app/common/compoments/Field/AgreementField/AgreementField';
import { saveInsuranceInfoClausesDataAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { StepCodesEnum } from '../../types';

const Clauses: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const cityAreaState = useSelector((state: RootState) => state.insure.fireInsurance.static.cityArea);
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  const insuranceInfoState = processState.insuranceInfo;
  const clauseState = processState.insuranceInfo.clauses.data;

  // 表單初始值
  const initialFormValues: ClausesFormValues = {
    delivery: '',
    clauses: {
      clause1st: false,
      clause2nd: false,
      agreeClause: ''
    }
  };

  // Yup Schema
  const yupSchema = Yup.object().shape({
    delivery: Yup.string().required('此為必填欄位'),
    clauses: Yup.object().shape({
      clause1st: Yup.boolean(),
      clause2nd: Yup.boolean(),
      agreeClause: Yup.string().required('此為必填欄位')
    })
  });

  // Formik Config
  const formik = useFormik<ClausesFormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialFormValues,
      ...clauseState
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      // 緩存此頁資料
      reduxDispatch(saveInsuranceInfoClausesDataAction(values));
      // 啟用下一步權限
      reduxDispatch(setAccessiableStepAction(StepCodesEnum.InsuranceInfoClauses));
      // 跳轉至下一步
      routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO);
    }
  });

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO);
  };

  // const handleNextClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO);
  // };

  /**
   * @description 轉換為完整地址
   */
  const convertFullAddress = () => {
    if (!insuranceInfoState.data) return;
    const { insured } = insuranceInfoState.data;
    if (!insured) return;
    let fullAddress = '';
    const city = cityAreaState.find(it => it.cityId === insured.cityId);
    if (city) {
      fullAddress += city.cityName;
      const area = city.area.find(it => it.areaId === insured.areaId);
      if (area) {
        fullAddress += area.areaName;
      }
    }
    fullAddress += insured.address;
    return fullAddress;
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              保單寄送方式
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">保單形式</div>
                <div className="form-layout-00__row">
                  <div className="form-layout-00__cell form-layout-00__cell--full">
                    <div className="radio-group-00 radio-group-00--wrap">
                      <div className="radio-group-00__item radio-group-00-item">
                        <RadioField id="electronic" name="delivery" value="1" text="電子保單（3-5個工作日)" subText={insuranceInfoState.data?.insured.email ?? ''} />
                      </div>
                      <div className="radio-group-00__item radio-group-00-item">
                        <RadioField id="paper" name="delivery" value="2" text="紙本保單（10個工作日)" subText={convertFullAddress()} />
                      </div>
                    </div>
                    <ErrorMessage name="delivery" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">條款須知</div>
            <div className="form-layout-00__body form-layout-00__body--type-2">
              <div className="form-layout-00__bordered-section">
                <ArticleDisplayer00 name="clauses.clause1st" title="網路保險服務定型化契約" contentClassName="article-displayer-00__content--typeA">
                  <InsuranceClause />
                </ArticleDisplayer00>
              </div>
              <div className="form-layout-00__bordered-section">
                <ArticleDisplayer00 name="clauses.clause2nd" title="線上要保注意事項/個人資料告知事項">
                  <InsuranceAndPersonalNoticeClause />
                </ArticleDisplayer00>
              </div>
              <div className="form-layout-00__shrinked-section">
                <AgreementField name="clauses.agreeClause" id="clauses.agreeClause" disabled={!(formik.values.clauses.clause1st && formik.values.clauses.clause2nd)} />
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
            <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
              返回上一步
            </button>
            <button type="submit" className={'inside-page-01-layout__btn btn-primary' + (!formik.values.clauses.agreeClause ? ' btn-primary--disabled' : '')} disabled={!formik.values.clauses.agreeClause}>
              下一步
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default Clauses;
