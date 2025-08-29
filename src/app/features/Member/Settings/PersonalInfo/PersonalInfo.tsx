import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PersonalInfoFormValues } from './types';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import Readonly01 from 'app/common/compoments/Form/Readonly';
import { RootState } from 'app/store/types';
import { fetchMemberProfileAction } from 'app/store/system/actions';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import * as Yup from 'yup';
import _ from 'lodash';
import DatePicker00Field from 'app/common/compoments/Field/DatePicker00Field';
import CodeField from 'app/common/compoments/Field/Telephone/CodeField';
import TelField from 'app/common/compoments/Field/Telephone/TelField';
import ExtField from 'app/common/compoments/Field/Telephone/ExtField';
import CellphoneField from 'app/common/compoments/Field/CellphoneField';
import AddressFieldsGroup from 'app/common/compoments/Field/AddressFieldsGroup';
import { initProcessAction, savePersonalInfoChangesAction, saveSettingsDataAction, sendSettingsOTPAction } from 'app/store/member/settings/actions';
import EmailField from 'app/common/compoments/Field/EmailField';
import SubscribeAdFlagField from 'app/common/compoments/Field/SubscribeAdFlagField';
import { SignupOtpReq } from 'app/bff/models/signupOtp';
import { OTPActionsEnum } from 'app/bff/enums/otp';
import { MemReqUd } from 'app/bff/models/mem/memReqUd';
import { ROUTES } from 'app/core/router';

const PersonalInfo: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);
  const memProfileState = useSelector((state: RootState) => state.system.member.profile);
  const staticState = useSelector((state: RootState) => state.member.settings.static);
  const cityAreaState = staticState.cityArea;
  const emailDomainState = staticState.emailDomain;
  const mobileCache = memProfileState?.mobile; // 會員之手機號碼
  const emailAddrCache = memProfileState?.emailAddr; // 會員之電子郵件
  // console.log(cityAreaState);
  // console.log(memProfileState);

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
    marriage: '',
    telAreaNo: '',
    telExtNo: '',
    telNo: '',
    emailAddr: '',
    postCode: '',
    cityId: '',
    areaId: '',
    address: '',
    registerTime: '',
    adFlag: false,
    inviteCode: null
  };

  // Formik Config
  const formik = useFormik<PersonalInfoFormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...memProfileState
    },
    validationSchema: Yup.object().shape({
      id: Yup.string(),
      name: Yup.string().required('此為必填欄位'),
      gender: Yup.string(),
      marriage: Yup.string()
    }),
    onSubmit: async (values: PersonalInfoFormValues) => {
      if (!authorizationState) return;
      // 判斷若有修改「行動電話」或「電子信箱」則需發送 OTP 驗證
      if (!_.isEqual(values.mobile, mobileCache) || !_.isEqual(values.emailAddr, emailAddrCache)) {
        reduxDispatch(saveSettingsDataAction(values));
        const args: SignupOtpReq = { action: OTPActionsEnum.NonMemberAuthentication };
        if (!_.isEqual(values.mobile, mobileCache)) args.mobile = values.mobile;
        if (!_.isEqual(values.emailAddr, emailAddrCache)) args.email = values.mobile;
        reduxDispatch(sendSettingsOTPAction(args));
      } else {
        // 執行會員資料修改
        const args: MemReqUd = {
          ...values,
          sn: authorizationState.member.sn,
          method: 'UPDATE'
        };
        reduxDispatch(savePersonalInfoChangesAction(args));
      }
    }
  });

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    reduxDispatch(initProcessAction());
  }, [reduxDispatch]);

  /**
   * @description 取得會員資料
   */
  useEffect(() => {
    if (authorizationState) {
      reduxDispatch(fetchMemberProfileAction({ sn: authorizationState.member.sn }));
    }
  }, [authorizationState, reduxDispatch]);

  return (
    <div className="inside-page-01-layout__latter inside-page-01-layout__latter--result">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="result-layout-00">
            <div className="result-layout-00__content">
              <div className="result-layout-00__block">
                <div className="inside-page-01-layout__form form-layout-00">
                  <div className="form-layout-00__title">會員資料</div>
                  <div className="form-layout-00__body">
                    {/* 姓名 */}
                    <div className="form-layout-00__section">
                      <div className="form-layout-00__title-tag">姓名</div>
                      <div className="form-layout-00__row">
                        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.name && formik.touched.name ? ' form-layout-00__cell--error' : '')}>
                          <Text00Field name="name" placeholder="中文姓名" />
                          <ErrorMessage name="name" render={(errMsg) => (
                            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                          )} />
                        </div>
                      </div>
                    </div>
                    {/* 身分證字號 */}
                    <div className="form-layout-00__section">
                      <Readonly01 label="身分證字號" content={formik.values.id} />
                    </div>
                    {/* 出生年月日 */}
                    <div className="form-layout-00__section">
                      <div className="form-layout-00__title-tag">出生年月日</div>
                      <div className="form-layout-00__row">
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
                    {/* 性別 */}
                    <div className="form-layout-00__section">
                      <Readonly01 label="性別" content={formik.values.gender === 'M' ? '男' : '女'} />
                    </div>
                    {/* 婚姻狀況 */}
                    <div className="form-layout-00__section">
                      <Readonly01 label="婚姻狀況" content={formik.values.marriage === '1' ? '已婚' : '未婚'} />
                    </div>
                    {/* 身份驗證方式 */}
                    <div className="form-layout-00__section">
                      <Readonly01 label="身份驗證方式" content="網路註冊（已驗證）" />
                    </div>
                    {/* 訂閱電子廣告郵件 */}
                    <div className="form-layout-00__section">
                      <SubscribeAdFlagField name="adFlag" id="adFlagUI-01" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper">
            <button
              type="submit"
              className={`inside-page-01-layout__btn btn-primary ${!(formik.isValid && formik.dirty) ? 'btn-primary--disabled' : ''}`}
              disabled={!(formik.isValid && formik.dirty)}
            >
              儲存修改
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default PersonalInfo;
