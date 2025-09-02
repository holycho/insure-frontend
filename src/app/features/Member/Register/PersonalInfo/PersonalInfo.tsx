import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { PersonalInfoFormValues } from './types';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import TextField from 'app/common/compoments/Field/TextField';
import DatePicker00Field from 'app/common/compoments/Field/DatePicker00Field';
import CodeField from 'app/common/compoments/Field/Telephone/CodeField';
import TelField from 'app/common/compoments/Field/Telephone/TelField';
import ExtField from 'app/common/compoments/Field/Telephone/ExtField';
import CellphoneField from 'app/common/compoments/Field/CellphoneField';
import AddressFieldsGroup from 'app/common/compoments/Field/AddressFieldsGroup';
import EmailField from 'app/common/compoments/Field/EmailField';
import SubscribeAdFlagField from 'app/common/compoments/Field/SubscribeAdFlagField';
import { saveRegisterDataAction, setAccessibleStepAction } from 'app/store/member/register/actions';
import { ROUTES } from 'app/core/router';
import AgreementField from 'app/common/compoments/Field/AgreementField/AgreementField';
import MemberClause from 'app/common/compoments/Clauses/MemberClause';
import ArticleDisplayer00 from 'app/common/compoments/ArticleDisplayer/ArticleDisplayer00';
import PersonalNoticeClause from 'app/common/compoments/Clauses/PersonalNoticeClause';
import InsuranceClause from 'app/common/compoments/Clauses/InsuranceClause';
import { RegisterRouteMatchesStep } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import commonService from 'app/core/services/commonService';

const PersonalInfo: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const resgiterDataState = useSelector((state: RootState) => state.member.register.data);
  const cityAreaState = useSelector((state: RootState) => state.member.register.static.cityArea);
  const emailDomainState = useSelector((state: RootState) => state.member.register.static.emailDomain);

  // 表單初始值
  const initialValues: PersonalInfoFormValues = {
    id: '',
    name: '',
    mobile: '',
    birthday: '',
    gender: '',
    groupCoLtdId: null,
    groupEmpId: null,
    groupRelation: null,
    groupUnitId: null,
    telAreaNo: '',
    telExtNo: '',
    telNo: '',
    emailAddr: '',
    postCode: '',
    cityId: '',
    areaId: '',
    address: '',
    agreeTimeMaPdp: '',
    adFlag: true,
    inviteCode: null,
    regSource: null,
    clause1st: false,
    clause2nd: false,
    clause3rd: false
  };

  // Formik Config
  const formik = useFormik<PersonalInfoFormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialValues, // 初始值
      ...resgiterDataState // 緩存資料
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      id: Yup.string().required(),
      birthday: Yup.string().required(),
      mobile: Yup.string().required(),
      emailAddr: Yup.string().required(),
      cityId: Yup.string().required(),
      areaId: Yup.string().required(),
      address: Yup.string().required(),
      clause1st: Yup.boolean().oneOf([true]),
      clause2nd: Yup.boolean().oneOf([true]),
      clause3rd: Yup.boolean().oneOf([true]),
      agreeTimeMaPdp: Yup.string().required()
    }),
    onSubmit: async (values: PersonalInfoFormValues) => {
      // 會員註冊資料緩存至 Store
      reduxDispatch(saveRegisterDataAction(values));
      // 將「確認資料」頁步驟 (Step-2-1) 設為可訪問步驟
      reduxDispatch(setAccessibleStepAction(RegisterRouteMatchesStep[ROUTES.MEMBER__REGISTER__CONFIRM_INFO]));
      // 導頁至「確認資料」頁 (Step-2-1)
      routerHistory.push(ROUTES.MEMBER__REGISTER__CONFIRM_INFO);
    }
  });

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          {/* 會員資料 */}
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">會員資料</div>
            <div className="form-layout-00__body">
              {/* 姓名 */}
              <div className="form-layout-00__section">
                <TextField name="name" label="姓名" placeholder="中文姓名" />
              </div>
              {/* 身份證字號 */}
              <div className="form-layout-00__section">
                <TextField name="id" label="身份證字號" placeholder="請輸入身份證字號" toUppercase maxLength={10} />
              </div>
              {/* 出生年月日 */}
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">出生年月日</div>
                <div className="form-layout-00__row">
                  <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--align-self-center">
                    <div className="form-layout-00__head-tag">民國</div>
                  </div>
                  <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.birthday && formik.touched.birthday ? ' form-layout-00__cell--error' : '')}>
                    <DatePicker00Field placeholder="出生年月日" name="birthday" id="birthday" curDate={formik.values.birthday} />
                    <ErrorMessage name="birthday" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
              </div>
              {/* 聯絡電話（非必填） */}
              <div className="form-layout-00__section">
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">聯絡電話（非必填）</div>
                  <div className="form-layout-00__row">
                    <CodeField name="telAreaNo" />
                    <div className="form-layout-00__dash">
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                      <div className="form-layout-00__row form-layout-00__row--wrap">
                        <TelField name="telNo" />
                        <ExtField name="telExtNo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 行動電話 */}
              <div className="form-layout-00__section">
                <CellphoneField name="mobile" />
              </div>
              {/* 聯絡地址 */}
              <div className="form-layout-00__section">
                <AddressFieldsGroup dataSource={cityAreaState} postCodeFName="postCode" cityIdFName="cityId" areaIdFName="areaId" addressFName="address" label="聯絡地址" />
              </div>
              {/* 電子郵件 */}
              <div className="form-layout-00__section">
                <EmailField name="emailAddr" emailDomain={emailDomainState} />
              </div>
              {/* 訂閱電子廣告郵件 */}
              <div className="form-layout-00__section">
                <SubscribeAdFlagField name="adFlag" id="adFlagUI-01" />
              </div>
            </div>
          </div>
          {/* 條款須知 */}
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">條款須知</div>
            <div className="form-layout-00__body form-layout-00__body--type-2">
              {/* 網站會員條款 */}
              <div className="form-layout-00__bordered-section">
                <ArticleDisplayer00 title="網站會員條款" name="clause1st">
                  <MemberClause />
                </ArticleDisplayer00>
              </div>
              {/* 個人資料告知事項 */}
              <div className="form-layout-00__bordered-section">
                <ArticleDisplayer00 title="個人資料告知事項" name="clause2nd">
                  <PersonalNoticeClause />
                </ArticleDisplayer00>
              </div>
              {/* 網路保險服務定型化契約 */}
              <div className="form-layout-00__bordered-section">
                <ArticleDisplayer00 title="網路保險服務定型化契約" name="clause3rd">
                  <InsuranceClause />
                </ArticleDisplayer00>
              </div>
              {/* 本人已閱覽並同意上述相關告知事項 */}
              <div className="form-layout-00__shrinked-section">
                <AgreementField id="agreeTimeMaPdp" name="agreeTimeMaPdp" disabled={!(formik.values.clause1st && formik.values.clause2nd && formik.values.clause3rd)} />
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper">
            <button type="submit" className={'inside-page-01-layout__btn btn-primary' + (!formik.values.agreeTimeMaPdp ? ' btn-primary--disabled' : '')} disabled={!formik.values.agreeTimeMaPdp}>
              下一步
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default PersonalInfo;