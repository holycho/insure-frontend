import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from 'app/core/router';
// import Select02 from 'app/common/compoments/Element/Select/Select02';
// import Input00 from 'app/common/compoments/Element/Input/Input00';
// import DatePicker00 from 'app/common/compoments/Element/DatePicker/DatePicker00';
import commonService from 'app/core/services/commonService';
// import Checkbox01 from 'app/common/compoments/Element/Checkbox/Checkbox01';
// import CheckboxInner from 'app/common/compoments/Element/Checkbox/CheckboxInner';
import { FormValues } from './types';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import * as Yup from 'yup';
import Select02Field from 'app/common/compoments/Field/Select02Field';
import DatePicker00Field from 'app/common/compoments/Field/DatePicker00Field';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import Checkbox01Field from 'app/common/compoments/Field/Checkbox01Field';
import CheckboxInnerField from 'app/common/compoments/Field/CheckboxInnerField';
import { RootState } from 'app/store/types';
import { OptionProps } from './types';
import apiService from 'app/bff/services/apiService';
import FormLayout01Group from 'app/common/compoments/FormLayout/FormLayout01Group';
import dayjs from 'dayjs';
import { saveCalcalationDataAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { StepCodesEnum } from '../types';
import alertService from 'app/core/services/alertService';
import { setDialogVisibleAction } from 'app/store/ui/actions';
import { setLoginRedirectUrl } from 'app/store/member/login/actions';
import { BuildingInsuamtReq } from 'app/bff/models/buildingInsuamt';
import { RightOutlined } from '@ant-design/icons';

const Calculation: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);
  const staticState = useSelector((state: RootState) => state.insure.fireInsurance.static);
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  const [unit, setUnit] = useState<OptionProps[]>([]);
  const [material, setMaterial] = useState<OptionProps[]>([]);
  const [roof, setRoof] = useState<OptionProps[]>([]);
  const [city, setCity] = useState<OptionProps[]>([]);
  const [cost, setCost] = useState<OptionProps[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const calculationState = processState.calculation.data;

  // 表單初始值
  const initialFormValues: FormValues = {
    building: {
      area: '',
      unit: '',
      storeyTotal: '',
      businessFlag: false,
      material: '',
      roof: 'CONCRETE',
      cityId: '',
      decorationCost: '',
      effDate: ''
    },
    insuAmt: {
      fireAmtPropose: '',
      movablePropertyAmtPropose: '',
      fireAmt: '',
      movablePropertyFlag: false, // 是否加保動保額
      movablePropertyAmt: ''
    },
    campaigns: [],
    premiums: [],
    campaignId: '' // 紀錄所選的方案
  };

  // 表單欄位檢核規則
  const yupSchema = Yup.object().shape({
    building: Yup.object().shape({
      area: Yup.string().required('此為必填欄位'),
      unit: Yup.string().required('此為必填欄位'),
      storeyTotal: Yup.string().required('此為必填欄位'),
      material: Yup.string().required('此為必填欄位'),
      roof: Yup.string().required('此為必填欄位'),
      cityId: Yup.string().required('此為必填欄位'),
      decorationCost: Yup.string().required('此為必填欄位'),
      effDate: Yup.string().required('此為必填欄位')
    }),
    insuAmt: Yup.object().shape({
      fireAmtPropose: Yup.string(),
      fireAmt: Yup.string().required('此為必填欄位').test({
        name: 'fireAmtValidationSchema',
        test: function (value) {
          const error = { message: '' };
          if (+value > +this.parent.fireAmtPropose) error.message = '建築物保險金額高於重置成本(' + this.parent.fireAmtPropose + '萬元)，請勿超額保險';
          return error.message ? this.createError({ message: error.message }) : true;
        }
      }),
      movablePropertyFlag: Yup.boolean(),
      // movablePropertyAmount: Yup.string().when('movablePropertyFlag', ([movablePropertyFlag], schema) => {
      //   return movablePropertyFlag ? schema.required('此為必填欄位') : schema;
      // })
      // movablePropertyAmt: Yup.string().when('movablePropertyFlag', {
      //   is: true,
      //   then: (schema) => schema.required('此為必填欄位')
      // })
      movablePropertyAmtPropose: Yup.string(),
      movablePropertyAmt: Yup.string().test({
        name: 'movablePropertyAmtValidationSchema',
        test: function (value) {
          const error = { message: '' };
          if (this.parent.movablePropertyFlag) {
            if (!value) {
              error.message = '此為必填欄位';
            } else {
              // 建築物保額 30 %
              if (+value > +this.parent.movablePropertyAmtPropose) {
                error.message = '超過建築物保額的 30%(' + this.parent.movablePropertyAmtPropose + '萬元)';
              }
              // 上限 80 萬元
              if (+value > 80) {
                error.message += (error.message ? '，' : '') + '超過上限 80 萬';
              }
            }
          }
          return error.message ? this.createError({ message: error.message }) : true;
        }
      })
    })
  });

  // Formik Config
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      ...initialFormValues,
      ...calculationState,
      premiums: [] // 回到試算頁需重新試算
    },
    validationSchema: yupSchema,
    onSubmit: async (values) => {
      console.log('表單', values);
      const { fireAmtPropose, movablePropertyAmtPropose } = values.insuAmt;
      if (!fireAmtPropose || !movablePropertyAmtPropose) {
        alertService.base('系統提醒', '請取得建議保額');
        return;
      }
      if (values.campaigns.length === 0) {
        // 取得方案
        const response = await apiService.postCampaign({ channelId: 'ALL' });
        if (response) {
          formik.setFieldValue('campaigns', response);
          formik.setFieldValue('campaignId', '');
        }
        return;
      } else {
        // 保費試算
        if (values.premiums.length === 0) {
          let allPremiumSuccess = true;
          const premiums = [];
          for (const campaign of values.campaigns) {
            const effDateAD = commonService.convertToADDate(values.building.effDate).replace(/\//g, '-');
            const expDateAD = dayjs(effDateAD).add(1, 'year').format('YYYY-MM-DD');
            const args = {
              planType: 'fire',
              subPlanType: campaign.campaignId === 'B2C' ? 'firersdn' : 'firecphs', // 住火: B2C，住綜: B2CRA
              projectCode: campaign.campaignId,
              fireAmount: +values.insuAmt.fireAmt,
              earthquakeAmount: 150, // 建議保額 API
              movablePropertyAmount: values.insuAmt.movablePropertyFlag ? +values.insuAmt.movablePropertyAmt : 0,
              effDateTime: `${effDateAD}T12:00:00.000`,
              expDateTime: `${expDateAD}T12:00:00.000`
            };
            const response = await apiService.postPremiumFire(args);
            if (response) {
              premiums.push({
                campaignId: campaign.campaignId,
                premium: response
              });
            } else allPremiumSuccess = false;
          }
          if (allPremiumSuccess) {
            formik.setFieldValue('premiums', premiums);
          }
          return;
        }
      }
      if (!values.campaignId) {
        alertService.base('系統提醒', '請選擇投保方案');
        return;
      }
      if (!authorizationState) {
        reduxDispatch(setDialogVisibleAction('loginDialog', true));
        return;
      }
      reduxDispatch(saveCalcalationDataAction(values));
      // 啟用下一步權限
      reduxDispatch(setAccessiableStepAction(StepCodesEnum.InsuranceInfoPatch));
      // 跳轉至下一步
      routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO);
    }
  });

  /**
   * @description 滾動到頁面頂部
   */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 轉換各欄位的選項
   */
  useEffect(() => {
    setUnit([
      { text: '單位', value: '' },
      ...staticState.unit.map(it => ({ text: it.paramText, value: it.paramValue }))
    ]);
    setMaterial([
      { text: '請選擇構造', value: '' },
      ...staticState.material.map(it => ({ text: it.paramText, value: it.paramValue }))
    ]);
    setRoof([
      { text: '屋頂', value: '' },
      ...staticState.roof.map(it => ({ text: it.paramText, value: it.paramValue }))
    ]);
    setCity([
      { text: '請輸入', value: '' },
      ...staticState.city.map(it => ({ text: it.paramText, value: it.paramValue }))
    ]);
    setCost([
      { text: '請輸入', value: '' },
      ...staticState.cost.map(it => ({ text: it.paramText, value: it.paramValue }))
    ]);
  }, [staticState]);

  /**
   * @description 若欄位資料有異動，則清除方案內容與試算結果
   */
  useEffect(() => {
    // 初始階段不觸發清除動作
    if (isLoaded) {
      formik.setFieldValue('campaigns', []);
      formik.setFieldValue('premiums', []);
    }
    // eslint-disable-next-line
  }, [formik.values.building, formik.values.insuAmt]);

  /**
   * @description 設定初始完畢
   */
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // const handlePrevClick = () => {
  //   routerHistory.push(ROUTES.HOME__MAIN);
  // };

  // const handleNextClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE);
  // };

  /**
   * @description 根據表單資料完整性，呈現適當步驟的按鈕文字
   */
  const displayButtonName = () => {
    if (formik.values.campaigns.length === 0) {
      return '選擇方案';
    } else {
      if (formik.values.premiums.length === 0) return '保費試算';
      else return '前往投保';
    }
  };

  const fetchProposeAmt = async () => {
    const { area, storeyTotal, material, roof, decorationCost, businessFlag, cityId, effDate } = formik.values.building;
    console.log('表單', formik.values);
    if (!area || !storeyTotal || !material || !roof || !decorationCost || !cityId || !effDate) {
      alertService.base('系統提醒', '請填寫完整建物資料');
      return;
    }
    const find = city.find(it => it.value === cityId);
    if (!find) return;
    const args: BuildingInsuamtReq = {
      buildingZipName: find.text,
      decorationCost: +decorationCost,
      businessFlag: businessFlag ? 'Y' : 'N',
      effDateTime: dayjs(effDate).format('YYYY-MM-DDT12:00:00.000'),
      roof,
      material,
      storeyTotal: +storeyTotal,
      usingArea: +area
    };
    console.log(args);
    // 取得火險建議保額
    const response = await apiService.postBuildingInsuamtPropose(args);
    if (response) {
      formik.setFieldValue('insuAmt.fireAmtPropose', response.fireAmount.toString());
      formik.setFieldValue('insuAmt.movablePropertyAmtPropose', response.movablePropertyPrice.toString());
      // 自動填入建議保額
      formik.setFieldValue('insuAmt.fireAmt', response.fireAmount.toString());
      formik.setFieldValue('insuAmt.movablePropertyAmt', response.movablePropertyPrice.toString());
    }
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="result-layout-00__block">
            <div className="inside-page-01-layout__form form-layout-00">
              <div className="form-layout-00__title">
                建物及權狀資料
              </div>
              <div className="form-layout-00__body">
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">使用面積</div>
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.area && formik.touched.building?.area ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="building.area" />
                      <ErrorMessage name="building.area" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.unit && formik.touched.building?.unit ? ' form-layout-00__cell--error' : '')}>
                      <Select02Field options={unit} name="building.unit" />
                      <ErrorMessage name="building.unit" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">建築樓高</div>
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                      <div className="form-layout-00__row ">
                        <div
                          className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                          <div className="form-layout-00__head-tag">
                            地上自一樓起共
                          </div>
                        </div>
                        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.storeyTotal && formik.touched.building?.storeyTotal ? ' form-layout-00__cell--error' : '')}>
                          <Text00Field name="building.storeyTotal" />
                          <ErrorMessage name="building.storeyTotal" render={(errMsg) => (
                            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                          )} />
                        </div>
                        <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                          <div className="form-layout-00__head-tag">
                            層
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--pushed form-layout-00__cell--align-self-center">
                      <Checkbox01Field id="building.businessFlag" name="building.businessFlag">同棟建築物有營業行為</Checkbox01Field>
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">建築構造</div>
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response form-layout-00__cell--size-4' + (formik.errors.building?.material && formik.touched.building?.material ? ' form-layout-00__cell--error' : '')}>
                      <Select02Field options={material} name="building.material" />
                      <ErrorMessage name="building.material" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.roof && formik.touched.building?.roof ? ' form-layout-00__cell--error' : '')}>
                      <Select02Field options={roof} name="building.roof" />
                      <ErrorMessage name="building.roof" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">所在地區</div>
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.cityId && formik.touched.building?.cityId ? ' form-layout-00__cell--error' : '')}>
                      <Select02Field options={city} name="building.cityId" />
                      <ErrorMessage name="building.cityId" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">裝潢成本</div>
                  <div className="form-layout-00__row">
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">每坪</div>
                    </div>
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.decorationCost && formik.touched.building?.decorationCost ? ' form-layout-00__cell--error' : '')}>
                      <Select02Field options={cost} name="building.decorationCost" />
                      <ErrorMessage name="building.decorationCost" render={(errMsg) => (
                        <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">元</div>
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">保險期間</div>
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className="form-layout-00__cell form-layout-00__cell--auto">
                      <div className="form-layout-00__row">
                        <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                          <div className="form-layout-00__head-tag">
                            自 民國
                          </div>
                        </div>
                        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.building?.effDate && formik.touched.building?.effDate ? ' form-layout-00__cell--error' : '')}>
                          <DatePicker00Field placeholder="年/月/日" name="building.effDate" id="building.effDate" curDate={formik.values.building.effDate} />
                          <ErrorMessage name="building.effDate" render={(errMsg) => (
                            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                          )} />
                        </div>
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--mobile-full form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">
                        中午12時起 保期1年
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inside-page-01-layout__form form-layout-00">
              <div className="form-layout-00__title">
                試算您要投保的保險金額
              </div>
              <div className="form-layout-00__body">
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">住宅火災保險</div>
                  <div className="form-layout-00__row ">
                    <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                      <div className="form-layout-00__row form-layout-00__row--wrap">
                        <div className="form-layout-00__cell form-layout-00__cell--auto">
                          <div className="form-layout-00__row">
                            <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                              <div className="form-layout-00__head-tag">
                                建築物保險金額
                              </div>
                            </div>
                            <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.insuAmt?.fireAmt && formik.touched.insuAmt?.fireAmt ? ' form-layout-00__cell--error' : '')}>
                              <Text00Field name="insuAmt.fireAmt" />
                            </div>
                            <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--align-self-center">
                              <div className="form-layout-00__head-tag">
                                萬元
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                          <div className="form-layout-00__row form-layout-00__row--spare form-layout-00__row--align-center ">
                            <div className="form-layout-00__head-tag">
                              （包含裝潢成本）
                            </div>
                            <div className="text-collection">
                              <div style={{ marginLeft: 3, border: 'solid 1px #DC143C', borderRadius: 5, padding: 5 }} className="text-collection__with-right-arrow text-collection__with-right-arrow__a" onClick={fetchProposeAmt}>
                                建議保額
                                <RightOutlined style={{ marginLeft: 3, fontSize: 12, fontWeight: '800' , color: '#DC143C' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name="insuAmt.fireAmt" render={(errMsg) => (
                    <div className="form-layout-00__cell--error">
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    </div>
                  )} />
                  <div className="form-layout-00__row form-layout-00__row--no-flex form-layout-00__row--smaller-gap">
                    <div className="form-layout-00__cell form-layout-00__cell--auto">
                      <div className="checkbox-01  checkbox-01--wrap-full">
                        <CheckboxInnerField id="insuAmt.movablePropertyFlag" name="insuAmt.movablePropertyFlag">加保建築物內動產保險金額</CheckboxInnerField>
                        <div className="checkbox-01__extension checkbox-01__extension--flex">
                          <div className={'checkbox-01__extension-cell' + (formik.errors.insuAmt?.movablePropertyAmt && formik.touched.insuAmt?.movablePropertyAmt ? ' form-layout-00__cell--error' : '')}>
                            <Text00Field name="insuAmt.movablePropertyAmt" />
                          </div>
                          <div className="checkbox-01__extension-cell checkbox-01__extension-cell-shrink">
                            萬元
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage name="insuAmt.movablePropertyAmt" render={(errMsg) => (
                    <div style={{ marginTop: 15 }} className="form-layout-00__cell--error">
                      <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
                    </div>
                  )} />
                  <div className="form-layout-00__hint-tag form-layout-00__hint-tag--mt20 hint-tag">
                    本保險契約於承保被保險人所有建築物之後，即自動承保其所有置存建築物內動產，其保險金額之約定以實際現金價值為基礎，並為建築物保險金額之30%，但最高以新臺幣80萬元為限，被保險人對前述動產之保險金額不足時，可另行投保其不足之部份。
                  </div>
                </div>
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">住宅火災保險</div>
                  <div className="form-layout-00__row ">
                    <div className="form-layout-00__cell form-layout-00__cell--full form-layout-00__cell--mobile-response">
                      <div className="form-layout-00__value-text">
                        採全國單一費率，每年保費新臺幣1,350元（每一戶按保額新臺幣一百五十萬元計算，保額低於一百五十萬元者，按比例計算保費）。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {formik.values.campaigns.length > 0 && (
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">
                  選擇方案
                </div>
                <div className="form-layout-00__body">
                  <div className="form-layout-00__row form-layout-00__row--f-wrap">
                    <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
                      <div className="form-layout-00__section">
                        <div className="form-layout-00__title-tag">保險期間</div>
                        <div className="form-layout-00__value-text">{commonService.displayTWDate2(formik.values.building.effDate)}中午12時 起1年</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {formik.values.campaigns.length > 0 && (
            <div className="result-layout-00__block">
              <div className="result-layout-00__label-text">選擇您需要的投保方案</div>
              <div className="form-layout-01">
                {formik.values.campaigns.map((campaign, index) => (
                  <FormLayout01Group
                    key={index}
                    index={index}
                    name="campaignId"
                    fireAmt={formik.values.insuAmt.fireAmt}
                    movablePropertyAmt={formik.values.insuAmt.movablePropertyFlag ? formik.values.insuAmt.movablePropertyAmt : '0'}
                    campaign={campaign} premium={formik.values.premiums ?? []}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
            {/* <button className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
                    返回上一步
                  </button> */}
            <button type="submit" className="inside-page-01-layout__btn btn-primary">
              {displayButtonName()}
            </button>
          </div>
        </FormikForm>
      </FormikProvider>
    </div>
  );
};

export default Calculation;
