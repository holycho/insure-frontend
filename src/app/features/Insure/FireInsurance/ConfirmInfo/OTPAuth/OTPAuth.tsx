import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { ROUTES } from 'app/core/router';
import commonService from 'app/core/services/commonService';
import { OTPAuthFormValues } from './types';
import { FormikProvider, useFormik } from 'formik';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import CaptchaField from 'app/common/compoments/Field/CaptchaField';
import { StepCodesEnum } from '../../types';
import { savePolicyInfoAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import apiService from 'app/bff/services/apiService';
import { RootState } from 'app/store/types';
import { PolicyFireReq, Product, Profit } from 'app/bff/models/policyFire';
import { PolicyState } from 'app/store/insure/fireInsurance/types';
import dayjs from 'dayjs';

const OTPAuth: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const staticState = useSelector((state: RootState) => state.insure.fireInsurance.static);
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  const calculationState = processState.calculation.data;
  const insuranceInfoState = processState.insuranceInfo.data;
  const clausesState = processState.insuranceInfo.clauses;
  const confirmInfoState = processState.confirmInfo;

  // 表單初始值
  const initialFormValues: OTPAuthFormValues = {
    otpCode: ''
  };

  // Yup Schema
  const yupSchema = Yup.object().shape({
    otpCode: Yup.string().required('此為必填欄位')
  });

  // Formik Config
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues,
    validationSchema: yupSchema,
    onSubmit: async (values: OTPAuthFormValues) => {
      if (!confirmInfoState.otpAuth.otp) return;
      const argsOtpVerify = {
        sn: confirmInfoState.otpAuth.otp.sn,
        otpCode: values.otpCode
      };
      // 驗證 OTP
      const respOtpVerify = await apiService.postOtpVerify(argsOtpVerify);
      if (respOtpVerify) {
        const argsPolicy = combinePolicyFireArgs();
        console.log(argsPolicy);
        if (!argsPolicy) return;
        // 新增保單
        const respPolicy = await apiService.postPolicyFire(argsPolicy);
        if (respPolicy && respPolicy.applyNo) {
          // 緩存保單資料
          const policy = combinePolicyFrontend(respPolicy.applyNo);
          if (!policy) return;
          reduxDispatch(savePolicyInfoAction(policy));
          // 啟用下一步權限
          reduxDispatch(setAccessiableStepAction(StepCodesEnum.Payment));
          // 跳轉至下一步
          routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT);
        }
      }
    }
  });

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 處理「上一步」執行的事件
   */
  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO);
  };

  // const handleNextClick = () => {
  //   routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT);
  // };

  const combinePolicyFireArgs = () => {
    if (!calculationState || !calculationState.building || !insuranceInfoState || !insuranceInfoState.insured) return;
    console.log(calculationState, insuranceInfoState, clausesState);
    const premium = calculationState.premiums[0];
    const campaign = calculationState.campaigns.find(it => it.campaignId === calculationState.campaignId);
    if (!campaign || !premium.premium) return;
    // 保費試算結果(原始)
    const originPremiumData = premium.premium.origin.data;
    // 保費試算結果(優惠)
    const discountPremiumData = premium.premium.discount.data;
    if (!originPremiumData || !discountPremiumData) return;
    // 說明：使用者輸入「建築物保險金額（含裝潢）」
    const fireAmount = +(calculationState.insuAmt.fireAmt ?? '0');
    // 說明：使用者輸入「動產保險金額」
    let movablePropertyAmount = 0;
    if (calculationState.insuAmt.movablePropertyFlag) {
      movablePropertyAmount = +(calculationState.insuAmt.movablePropertyAmt ?? '0');
    }
    const _products: Product[] = [];
    campaign.plans.forEach((plan) => {
      if (['A1', 'A2', 'R0'].includes(plan.planCode)) {
        const _profits: Profit[] = [];
        plan.profits.forEach((profit) => {
          // 說明：建築物建議保額 (B)
          if (profit.profitId === 'B') {
            _profits.push({
              profitId: 'B',
              amt: (fireAmount * profit.profitUnitValue),
              displayAmt: `${fireAmount}${profit.profitUnitName}`,
              fee: originPremiumData.firePremium,
              discount: discountPremiumData.firePremium,
              deductibleId: profit.deductibleId,
              deductibleVer: profit.deductibleVer
            });
            return;
          }
          // 說明：加保建築物內動產 (MPIB)
          if (profit.profitId === 'MPIB') {
            _profits.push({
              profitId: 'MPIB',
              amt: (movablePropertyAmount * profit.profitUnitValue),
              displayAmt: `${movablePropertyAmount}${profit.profitUnitName}`,
              // 說明：IP#63 住火險保費計算(原始保費+優惠保費)
              fee: originPremiumData.raisePremium,
              discount: discountPremiumData.raisePremium,
              deductibleId: profit.deductibleId,
              deductibleVer: profit.deductibleVer
            });
            return;
          }
          // 說明：住宅地震 (BWMPD)
          if (profit.profitId === 'BWMPD') {
            _profits.push({
              profitId: 'BWMPD',
              amt: (discountPremiumData.earthquakeAmount * profit.profitUnitValue),
              displayAmt: `${discountPremiumData.earthquakeAmount}${profit.profitUnitName}`,
              fee: originPremiumData.earthquakePremium,
              discount: discountPremiumData.earthquakePremium,
              deductibleId: profit.deductibleId,
              deductibleVer: profit.deductibleVer
            });
            return;
          }
          _profits.push({
            profitId: profit.profitId,
            amt: profit.profitAmt,
            displayAmt: profit.profitAmtDisplay,
            fee: 0,
            discount: 0,
            deductibleId: profit.deductibleId,
            deductibleVer: profit.deductibleVer
          });
        });
        // 累加 A1、A2、R0 原始與優惠保費
        let totalFee = 0;
        let totalDiscount = 0;
        _profits.forEach(it => {
          totalFee += it.fee;
          totalDiscount += it.discount;
        });
        // 前端組合商品 A1、A2、R0
        _products.push({
          planCode: plan.planCode,
          planType: 'fire',
          subPlanType: campaign.campaignId === 'B2C' ? 'firersdn' : 'firecphs', // 住火方案: B2C，住綜方案: B2CRA
          ver: plan.ver,
          fixedFee: totalFee,
          feeAfterDiscount: totalDiscount,
          profits: _profits
        });
      }
    });
    const startDateAD = commonService.convertToADDate(calculationState.building.effDate);
    const endDateAD = dayjs(startDateAD).add(1, 'year').format('YYYY/MM/DD');
    const buildingYear = insuranceInfoState.building.buildingYear.split('/')[0] ?? '';
    // 抵押權人
    const { mortgage } = insuranceInfoState.building;
    let mortgageBank = null;
    let mortgageBankName = null;
    let mortgageBranch = null;
    let mortgageBranchName = null;
    let bankContact = null;
    let contactZipCode = null;
    let contactZipName = null;
    let contactDistrict = null;
    let contactFullAddress = null;
    if (mortgage.hasMortgage === 'Y') {
      const mbank = staticState.morgageBank.find(it => it.bankCode === mortgage.bankCode);
      if (mbank) {
        mortgageBank = mbank.bankCode;
        mortgageBankName = mbank.bankName;
        const mbranch = mbank.branchs.find(it => it.branchCode === mortgage.branchCode);
        if (mbranch) {
          mortgageBranch = mbranch.branchCode;
          mortgageBranchName = mbranch.branchName;
        }
      }
      // 收件人
      if (mortgage.isSentToBank === 'Y') {
        bankContact = mortgage.recipient;
        contactZipCode = mortgage.contactPostCode;
        const city = staticState.cityArea.find(it => it.cityId === mortgage.contactCityId);
        if (city) {
          contactZipName = city.cityName;
          const area = city.area.find(it => it.areaId === mortgage.contactAreaId);
          if (area) contactDistrict = area.areaName;
        }
        contactFullAddress = `${contactZipName ?? ''}${contactDistrict ?? ''}${mortgage.contactAddress ?? ''}`;
      }
    }
    const args: PolicyFireReq = {
      productId: calculationState.campaignId === 'B2C' ? 'FIRE011' : 'FIRE012',
      bcType: 'C',
      policyApplicant: {
        ...insuranceInfoState.insured,
        idType: 'N'
      },
      policyInfo: {
        startTime: calculationState.building.effDate,
        endTime: commonService.convertToTWDate(endDateAD),
        campaignId: calculationState.campaignId,
        agreeTime: clausesState.data?.clauses.agreeClause ?? '',
        isDualInsu: insuranceInfoState.building.isInsuredWithOtherCompanies,
        discount: premium.premium.origin.total - premium.premium.discount.total,
        totalFeeDiscount: premium.premium.discount.total,
        products: _products
      },
      buildingInfo: {
        buildingPostCode: insuranceInfoState.building.postCode,
        buildingCityId: insuranceInfoState.building.cityId,
        buildingAreaId: insuranceInfoState.building.areaId,
        buildingAddress: insuranceInfoState.building.address,
        buildingFullAddress: getFullAddress(),
        buildingYear,
        buildingArea: +calculationState.building.area,
        buildingAreaM: +(+calculationState.building.area * 3.3058).toFixed(2),
        storeyAbove: +calculationState.building.storeyTotal,
        businessFlag: calculationState.building.businessFlag ? 'Y' : 'N',
        buildingMaterial: calculationState.building.material,
        buildingRoof: calculationState.building.roof,
        decorationCost: +calculationState.building.decorationCost,
        buildingGrade: 'B', // 建議保額 API
        buildingGradeDescription: '特二等', // 建議保額 API
        rebuildPrice: 0, // 建議保額 API
        noDecorationRebuild: 0, // 建議保額 API
        movablePropertyPrice: discountPremiumData.raisePremium, // 「動產價值」保費
        fireAmount: fireAmount,
        extraMovablePropAmount: discountPremiumData.raiseAmount, // 加保動產保額(萬元)
        earthquakeAmount: discountPremiumData.earthquakeAmount
      },
      mortgage: {
        mortgageBank,
        mortgageBankName,
        mortgageBranch,
        mortgageBranchName,
        bankContact,
        contactZipCode,
        contactZipName,
        contactDistrict,
        contactFullAddress
      },
      policyDelivery: {
        delivery: clausesState.data ? String(+clausesState.data.delivery - 1) : '0'
      }
    };
    return args;
  };

  const getFullAddress = () => {
    return '';
  };

  const combinePolicyFrontend = (applyNo: string) => {
    if (!calculationState || calculationState.premiums.length === 0 || calculationState.campaigns.length === 0) return;
    const campaign = calculationState.campaigns.find(it => it.campaignId === calculationState.campaignId);
    const res = calculationState.premiums.find(it => it.campaignId === calculationState.campaignId);
    if (!res || !campaign) return;
    const policy: PolicyState = {
      applyNo,
      amount: res.premium.discount.total,
      premium: res,
      campaign: campaign
    };
    return policy;
  };

  return (
    <div className="inside-page-01-layout__latter">
      <FormikProvider value={formik}>
        <FormikForm>
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__title">
              確認身份
            </div>
            <div className="form-layout-00__body">
              <div className="form-layout-00__section">
                <CaptchaField name="otpCode" duration={30} />
              </div>
            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
            <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
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

export default OTPAuth;
