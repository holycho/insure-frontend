import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import commonService from 'app/core/services/commonService';
import { InsuranceInfoFormValues } from './types';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import * as Yup from 'yup';
import Readonly01 from 'app/common/compoments/Form/Readonly';
import RadioGroup00Field from 'app/common/compoments/Field/RadioGroup00Field';
import apiService from 'app/bff/services/apiService';
import { RadioProps } from 'app/common/compoments/Field/RadioGroup00Field/types';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import EmailField from 'app/common/compoments/Field/EmailField';
import CellphoneField from 'app/common/compoments/Field/CellphoneField';
import validationService from 'app/core/services/validationService';
import CodeField from 'app/common/compoments/Field/Telephone/CodeField';
import TelField from 'app/common/compoments/Field/Telephone/TelField';
import ExtField from 'app/common/compoments/Field/Telephone/ExtField';
import AddressFieldsGroup from 'app/common/compoments/Field/AddressFieldsGroup';
import DatePicker00Field from 'app/common/compoments/Field/DatePicker00Field';
import MortgageBankField from 'app/common/compoments/Field/MortgageBankField';
import ContactField from 'app/common/compoments/Field/ContactField';
import { saveInsuranceInfoDataAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StepCodesEnum } from '../types';
import { RootState } from 'app/store/types';
import alertService from 'app/core/services/alertService';

/**
 * @description 「是或否」選單項目
 */
export const YesNoOptions = [
  { value: 'N', text: '否' },
  { value: 'Y', text: '是' }
];

const InsuranceInfo: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const profileState = useSelector((state: RootState) => state.system.member.profile);
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  const cityAreaState = useSelector((state: RootState) => state.insure.fireInsurance.static.cityArea);
  const emailDomainState = useSelector((state: RootState) => state.insure.fireInsurance.static.emailDomain);
  const [occOptions, setOccOptions] = useState<RadioProps[]>([]);
  const [feeSrcOptions, setFeeSrcOptions] = useState<RadioProps[]>([]);
  const calculationState = processState.calculation.data;
  const insuranceInfoState = processState.insuranceInfo.data;
  // console.log('會員資料', profileState);
  // console.log('試算資料', calculationState);
  // console.log('投保資料', insuranceInfoState);

  // 表單初始值
  let initialFormValues: InsuranceInfoFormValues = {
    insured: {
      name: '',
      id: '',
      birthday: '',
      telAreaNo: '',
      telNo: '',
      telExtNo: '',
      mobile: '',
      postCode: '',
      cityId: '',
      areaId: '',
      address: '',
      email: '',
      occId: '',
      occDomain: '',
      feeSource: '',
      feeSourceNote: '',
      hearingDisability: ''
    },
    building: {
      postCode: '',
      cityId: '',
      areaId: '',
      address: '',
      buildingYear: '',
      mortgage: {
        hasMortgage: 'N',
        bankCode: '',
        branchCode: '',
        // contact: {
        //   isSentToBank: 'N',
        //   recipient: '',
        //   bankPostCode: '',
        //   bankCityId: '',
        //   bankAreaId: '',
        //   bankAddress: ''
        // }
        isSentToBank: 'N',
        recipient: '',
        contactPostCode: '',
        contactCityId: '',
        contactAreaId: '',
        contactAddress: ''
      },
      isInsuredWithOtherCompanies: ''
    },
    member: {
      code: ''
    }
  };

  // 載入緩存資料，檢核與排除投保資料的衝突
  if (profileState) {
    initialFormValues = {
      ...initialFormValues,
      insured: {
        ...initialFormValues.insured,
        // 會員資料
        name: profileState.name,
        id: profileState.id,
        birthday: profileState.birthday,
      }
    };
  }
  if (insuranceInfoState) {
    initialFormValues = {
      ...insuranceInfoState
    };
    // 檢查標的物地區
    if (calculationState && calculationState.building.cityId !== insuranceInfoState.building.cityId) {
      initialFormValues.building = {
        ...initialFormValues.building,
        cityId: calculationState.building.cityId,
        postCode: '',
        areaId: '',
        address: ''
      };
    }
  } else {
    if (calculationState) {
      initialFormValues.building = {
        ...initialFormValues.building,
        cityId: calculationState.building.cityId,
        postCode: '',
        areaId: '',
        address: ''
      };
    }
  }

  const yupSchema = Yup.object().shape({
    insured: Yup.object().shape({
      mobile: Yup.string().concat(validationService.cellphoneNumbersSchema),
      cityId: Yup.string().required('此為必填欄位'),
      areaId: Yup.string().required('此為必填欄位'),
      address: Yup.string().required('此為必填欄位'),
      email: Yup.string().required('此為必填欄位'),
      occId: Yup.string().required('此為必填欄位'),
      feeSource: Yup.string().required('此為必填欄位'),
      feeSourceNote: Yup.string().when('feeSource', {
        is: '99', // 其他資金來源
        then: (schema) => schema.required('請輸入其他資金來源')
      }),
      hearingDisability: Yup.string().required('此為必填欄位')
    }),
    building: Yup.object().shape({
      cityId: Yup.string().required('此為必填欄位'),
      areaId: Yup.string().required('此為必填欄位'),
      address: Yup.string().required('此為必填欄位'),
      buildingYear: Yup.string().required('此為必填欄位'),
      mortgage: Yup.object().shape({
        hasMortgage: Yup.string(),
        bankCode: Yup.string().when('hasMortgage', {
          is: 'Y', // 有抵押權人
          then: (schema) => schema.required('請選擇銀行')
        }),
        branchCode: Yup.string().when('hasMortgage', {
          is: 'Y', // 有抵押權人
          then: (schema) => schema.required('請選擇分行')
        }),
        // contact: Yup.object().shape({
        //   isSentToBank: Yup.string(),
        //   recipient: Yup.string().when('isSentToBank', {
        //     is: 'Y',
        //     then: (schema) => schema.required('請填寫收件人')
        //   }),
        //   bankCityId: Yup.string().when('isSentToBank', {
        //     is: 'Y',
        //     then: (schema) => schema.required('請選擇城市')
        //   }),
        //   bankAreaId: Yup.string().when('isSentToBank', {
        //     is: 'Y',
        //     then: (schema) => schema.required('請選擇行政區')
        //   }),
        //   bankAddress: Yup.string().when('isSentToBank', {
        //     is: 'Y',
        //     then: (schema) => schema.required('請填寫地址')
        //   })
        // })
        isSentToBank: Yup.string(),
        recipient: Yup.string().when(['hasMortgage', 'isSentToBank'], {
          is: (hasMortgage: string, isSentToBank: string) => hasMortgage === 'Y' && isSentToBank === 'Y',
          then: (schema) => schema.required('請填寫收件人')
        }),
        contactCityId: Yup.string().when(['hasMortgage', 'isSentToBank'], {
          is: (hasMortgage: string, isSentToBank: string) => hasMortgage === 'Y' && isSentToBank === 'Y',
          then: (schema) => schema.required('請選擇城市')
        }),
        contactAreaId: Yup.string().when(['hasMortgage', 'isSentToBank'], {
          is: (hasMortgage: string, isSentToBank: string) => hasMortgage === 'Y' && isSentToBank === 'Y',
          then: (schema) => schema.required('請選擇行政區')
        }),
        contactAddress: Yup.string().when(['hasMortgage', 'isSentToBank'], {
          is: (hasMortgage: string, isSentToBank: string) => hasMortgage === 'Y' && isSentToBank === 'Y',
          then: (schema) => schema.required('請填寫地址')
        }),
      }),
      isInsuredWithOtherCompanies: Yup.string().required('此為必填欄位')
    })
  });

  // Formik Config
  const formik = useFormik<InsuranceInfoFormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialFormValues
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      // 說明：若是「軍火商、博弈產業/公司」，則跳出警語並禁止繼續投保。
      if (values.insured.occId === '03') {
        const defaultMsg = '●本案須以紙本方式受理及人工核保進行作業，請您親至本公司各營業單位洽詢投保相關事宜或請您透過客服信箱(e-service@mail.cki.com.tw)留下聯絡資料及欲投保之險種，本公司將派專員與您聯繫，如有不便，敬請見諒，謝謝。';
        alertService.custom3('系統提醒', defaultMsg);
        return;
      }
      // 執行重複多家公司投保檢核
      if (values.building.isInsuredWithOtherCompanies === 'Y') {
        const defaultMsg = '因您已於其他公司投保，基於保險風險考量，本公司無法承接您的投保。';
        alertService.base('系統提醒', defaultMsg);
        return;
      }
      // 緩存此頁資料
      reduxDispatch(saveInsuranceInfoDataAction(values));
      // 啟用下一步權限
      reduxDispatch(setAccessiableStepAction(StepCodesEnum.InsuranceInfoClauses));
      // 跳轉至下一步
      routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES);
    }
  });
  console.log(formik);

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 轉換各欄位的選項
   */
  useEffect(() => {
    (async () => {
      const occ = await apiService.postParams({ paramType: 'occ' });
      if (occ) {
        setOccOptions(occ.map(it => ({ text: it.paramText, value: it.paramValue })));
      }
      const feeSrc = await apiService.postParams({ paramType: 'feeSrc' });
      if (feeSrc) {
        setFeeSrcOptions(feeSrc.map(it => {
          if (it.paramValue === '99') {
            return {
              text: it.paramText,
              value: it.paramValue,
              withInputField: 'insured.feeSourceNote'
            };
          }
          return {
            text: it.paramText,
            value: it.paramValue
          };
        }));
      }
    })();
  }, []);

  /**
   * @description 更新職業名稱
   */
  useEffect(() => {
    const { occId } = formik.values.insured;
    if (occId) {
      const find = occOptions.find(it => it.value === occId);
      if (find) {
        formik.setFieldValue('insured.occDomain', find.text);
      }
    }
    // eslint-disable-next-line
  }, [formik.values.insured.occId]);

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CALCULATION);
  };

  // const handleNextClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES);
  // };

  /**
   * @description 執行標的物地址同步
   */
  const handleBuildingAddressSync = () => {
    const { postCode, cityId, areaId, address } = formik.values.insured;
    // 若「聯絡地址」已填寫完畢，則觸發資料同步
    if (postCode && cityId && areaId && address) {
      formik.setFieldValue('building.postCode', '');
      formik.setFieldValue('building.cityId', '');
      formik.setFieldValue('building.areaId', '');
      formik.setFieldValue('building.address', '');
      // 清除資料後同步
      formik.setFieldValue('building.postCode', postCode);
      formik.setFieldValue('building.cityId', cityId);
      formik.setFieldValue('building.areaId', areaId);
      formik.setFieldValue('building.address', address);
    }
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              要保人資料
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <Readonly01 cellClassName="form-layout-00__cell--full" label="姓名" content={formik.values.insured.name} />
              </div>
              <div className="form-layout-00__section">
                <Readonly01 cellClassName="form-layout-00__cell--full" label="身分證字號" content={formik.values.insured.id} />
              </div>
              <div className="form-layout-00__section">
                <Readonly01 cellClassName="form-layout-00__cell--full" label="出生年月日" content={commonService.displayTWDate(formik.values.insured.birthday)} />
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">聯絡電話（非必填）</div>
                <div className="form-layout-00__row">
                  <CodeField name="insured.telAreaNo" />
                  <div className="form-layout-00__dash">
                  </div>
                  <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                    <div className="form-layout-00__row form-layout-00__row--wrap">
                      <TelField name="insured.telNo" />
                      <ExtField name="insured.telExtNo" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-00__section">
                <CellphoneField name="insured.mobile" />
              </div>
              <div className="form-layout-00__section">
                <AddressFieldsGroup dataSource={cityAreaState} postCodeFName="insured.postCode" cityIdFName="insured.cityId" areaIdFName="insured.areaId" addressFName="insured.address" label="聯絡地址" hintTags={['若選擇紙本保單，將寄送至此聯絡地址。']} />
              </div>
              <div className="form-layout-00__section">
                <EmailField name="insured.email" emailDomain={emailDomainState} hintTags={['若選擇電子保單，將寄送至此電子郵件信箱。']} />
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">被保險人職業</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--full' + (formik.errors.insured?.occId && formik.touched.insured?.occId ? ' form-layout-00__cell--error' : '')}>
                    <RadioGroup00Field name="insured.occId" groupClassName="radio-group-00--mt8-m-mt0 radio-group-00--auto-wrap radio-group-00--mobile-2-col" itemClassName="" options={occOptions} />
                    <ErrorMessage name="insured.occId" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
                <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                <div className="form-layout-00__hint-tag hint-tag">
                  註一：(1)
                  律師、會計師、公證人，或是其合夥人或受僱人。不動產經紀人。當鋪業、融資從業人員。寶石及貴金屬交易商。藝術品/骨董交易商、拍賣公司。基金會、協會/寺廟、教會從業人員。匯款公司、外幣兌換所。外交人員、大使館、辦事處。虛擬貨幣的發行者或交易商。(2)
                  金融業、信託及公司服務供應商、金融服務業及保險業、預付卡及移動支付和互聯網支付服務業、金錢或價值移轉服務業、證券業、非營利組織之社團法人。
                </div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">
                  繳交保險費資金來源
                </div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--full' + ((formik.errors.insured?.feeSource && formik.touched.insured?.feeSource) || (formik.errors.insured?.feeSourceNote && formik.touched.insured?.feeSourceNote) ? ' form-layout-00__cell--error' : '')}>
                    <RadioGroup00Field name="insured.feeSource" groupClassName="radio-group-00--auto-wrap radio-group-00--mobile-2-col radio-group-00--mobile-gap-type-a" itemClassName="" options={feeSrcOptions} />
                    <ErrorMessage name="insured.feeSource" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                    <ErrorMessage name="insured.feeSourceNote" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
                <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">被保險人是否為聽障或語障人士</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--no-shrink' + (formik.errors.insured?.hearingDisability && formik.touched.insured?.hearingDisability ? ' form-layout-00__cell--error' : '')}>
                    <RadioGroup00Field name="insured.hearingDisability" groupClassName="" itemClassName="" options={YesNoOptions} />
                    <ErrorMessage name="insured.hearingDisability" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
                <div className="form-layout-00__hint-tag hint-tag">
                  若被保險人為聽、語障人士，本公司客服人員將是需要以簡訊或電子郵件方式與您聯繫。
                </div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__hint-tag hint-tag">
                  上述部分問項係依洗錢防制法相關法令執行確認客戶身分措施。
                </div>
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              被保險人資料
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__centered-information">
                被保險人同要保人。
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              建物資料
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <AddressFieldsGroup dataSource={cityAreaState} postCodeFName="building.postCode" cityIdFName="building.cityId" areaIdFName="building.areaId" addressFName="building.address" label="標的物地址" disabledCity>
                  {/* <button type="button" className="form-layout-00__head-link" onClick={handleBuildingAddressSync}>同通訊地址</button> */}
                </AddressFieldsGroup>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">標的物建造年份</div>
                <div className="form-layout-00__row ">
                  <div
                    className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                    <div className="form-layout-00__head-tag">
                      民國
                    </div>
                  </div>
                  <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.buildingYear && formik.touched.building?.buildingYear ? ' form-layout-00__cell--error' : '')}>
                    <DatePicker00Field placeholder="年/月/日" name="building.buildingYear" id="building.buildingYear" curDate={formik.values.building.buildingYear} />
                    <ErrorMessage name="building.buildingYear" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">
                  保險期間
                </div>
                <div className="form-layout-00__row">
                  <div className="form-layout-00__cell form-layout-00__cell--auto">
                    <div className="form-layout-00__value-text">
                      {commonService.displayTWDate(calculationState?.building.effDate)}中午12時 起1年
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">是否有抵押權人</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--no-shrink' + (formik.errors.building?.mortgage?.hasMortgage && formik.touched.building?.mortgage?.hasMortgage ? ' form-layout-00__cell--error' : '')}>
                    <RadioGroup00Field name="building.mortgage.hasMortgage" groupClassName="" itemClassName="" options={YesNoOptions} />
                    <ErrorMessage name="building.mortgage.hasMortgage" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
              </div>
              {formik.values.building.mortgage.hasMortgage === 'Y' && (
                <>
                  <div className="form-layout-00__section">
                    <MortgageBankField bankCodeFName="building.mortgage.bankCode" branchCodeFName="building.mortgage.branchCode" />
                  </div>
                  <div className="form-layout-00__section">
                    <ContactField
                      isSentToBankFName="building.mortgage.isSentToBank"
                      recipientFName="building.mortgage.recipient"
                      bankPostCodeFName="building.mortgage.contactPostCode"
                      bankCityIdFName="building.mortgage.contactCityId"
                      bankAreaIdFName="building.mortgage.contactAreaId"
                      bankAddressFName="building.mortgage.contactAddress"
                      dataSource={cityAreaState}
                    />
                  </div>
                </>
              )}
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">是否向其他公司投保</div>
                <div className="form-layout-00__row">
                  <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--no-shrink' + (formik.errors.building?.isInsuredWithOtherCompanies && formik.touched.building?.isInsuredWithOtherCompanies ? ' form-layout-00__cell--error' : '')}>
                    <RadioGroup00Field name="building.isInsuredWithOtherCompanies" groupClassName="" itemClassName="" options={YesNoOptions} />
                    <ErrorMessage name="building.isInsuredWithOtherCompanies" render={(errMsg) => (
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    )} />
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              個人專屬代號
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">個人專屬代號（非必填）</div>
                <div className="form-layout-00__row ">
                  <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                    <Text00Field name="member.code" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
            <button className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
              返回上一步
            </button>
            <button type="submit" className="inside-page-01-layout__btn btn-primary">
              下一步
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default InsuranceInfo;
