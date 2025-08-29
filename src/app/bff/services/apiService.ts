import axios, { AxiosRequestConfig } from 'axios';
import environment from 'environments';
import { BaseReq, BaseResp, ReqHeader, SortPageReq } from 'app/bff/models/base';
import { ParamsReq, ParamsResp } from 'app/bff/models/params';
import { CampaignReq, CampaignResp } from 'app/bff/models/campaign';
import { PremiumFireReq, PremiumFireResp } from 'app/bff/models/premiumFire';
import { CityAreaReq, CityAreaResp } from 'app/bff/models/cityArea';
import { MorgageReq, MorgageResp } from 'app/bff/models/morgage';
import { OtpSendReq, OtpSendResp } from 'app/bff/models/otp/otpSend';
import { OtpVerifyReq, OtpVerifyResp } from 'app/bff/models/otp/otpVerify';
import { PaybyReq, PaybyResp } from 'app/bff/models/payby';
import { BankReq, BankResp } from 'app/bff/models/bank';
import { PolicyFireReq, PolicyFireResp } from 'app/bff/models/policyFire';
import { PaymentReq, PaymentResp } from 'app/bff/models/payment';
import { SigninPreReq, SigninPreResp } from 'app/bff/models/signinPre';
import { SigninReq, SigninResp } from 'app/bff/models/signin';
import { CaptchaGetReq, CaptchaGetResp } from 'app/bff/models/captchaGet';
import commonService from 'app/core/services/commonService';
import { SignoutReq, SignoutResp } from 'app/bff/models/signout';
import { MemDetailReq, MemDetailResp } from 'app/bff/models/memDetail';
import { LinkUrlReq, LinkUrlResp } from 'app/bff/models/linkUrl';
import { PaymentListMemReq, PaymentListMemResp } from 'app/bff/models/service/paymentListMem';
import { PaymentListReq, PaymentListResp } from 'app/bff/models/service/paymentList';
import { VerifyApplyNoReq, VerifyApplyNoResp } from 'app/bff/models/verifyApplyNo';
import { PaymentDetailReq, PaymentDetailResp } from 'app/bff/models/service/paymentDetail';
import { PolicyListReq, PolicyListResp } from 'app/bff/models/service/policyList';
import { PolicySingleReq, PolicySingleResp } from '../models/service/policySingle';
import { PaymentSingleReq, PaymentSingleResp } from '../models/service/paymentSingle';
import { PolicyDetailFireReq, PolicyDetailFireResp } from '../models/service/policyDetailFire';
import { BuildingInsuamtReq } from '../models/buildingInsuamt';
import { BuildingInsuamtResp } from '../models/buildingInsuamt/buildingInsuamtResp';
import { SignupOtpReq, SignupOtpResp } from '../models/signupOtp';
import { MemReqUd } from '../models/mem/memReqUd';
import { MemResp } from '../models/mem';
import { MemRegReq, MemRegResp } from '../models/memReg';
import { RecommendProdReq, RecommendProdResp } from '../models/recommendProd';
import { NewsListReq, NewsListResp } from '../models/news/list';
import { NewsDetailReq, NewsDetailResp } from '../models/news/detail';
import { PromoListReq, PromoListResp } from '../models/promo/list';
import { PromoDetailReq, PromoDetailResp } from '../models/promo/detail';
import { BannerReq, BannerResp } from '../models/banner';

const { domainName, resources, api } = environment.backend;
const combineBaseReq = <T>(reqHeader: ReqHeader, transReq: T): BaseReq<T> => ({ reqHeader, transReq });
const combineConfig = (config?: AxiosRequestConfig) => {
  return {
    baseURL: `${domainName}${resources.api}`,
    ...config
  };
};

// 專案經驗：對安全係數要求高的專案中，於正式環境下會禁止使用 post 以外的方法。(包含後台對甲方核心端)

export default {
  /**
   * @description 取得 Header & Footer 文字連結
   * @param args 上行電文
   * @param config Axios 設定
   */
  postLinkUrl: async (args: LinkUrlReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<LinkUrlReq>({}, args);
    return axios.post<BaseResp<LinkUrlResp>>(`${api.modules.fesrc}/linkUrl`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 取得 Banner
   */
  postBanner: async (args: BannerReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<BannerReq>({} , args);
    return axios.post<BaseResp<BannerResp>>(`${api.modules.fesrc}/banner`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp.banner : null);
  },
  /**
   * @description 取得最新消息列表
   */
  postNewsList: async (sortPage: SortPageReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<NewsListReq>({ sortPage }, {});
    const emptyResp = { totalCount: 0, news: [], moreUrl: [] };
    return axios.post<BaseResp<NewsListResp>>(`${api.modules.fesrc}/news/list`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? { ...response.data.transResp, totalCount: response.data.respHeader.sortPage.totalCount } : emptyResp);
  },
  /**
   * @description 取得最新消息明細
   */
  postNewsDetail: async (args: NewsDetailReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<NewsDetailReq>({}, args);
    return axios.post<BaseResp<NewsDetailResp>>(`${api.modules.fesrc}/news/detail`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 取得熱門活動列表
   */
  postPromoList: async (sortPage: SortPageReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PromoListReq>({ sortPage }, {});
    const emptyResp = { totalCount: 0, promo: [], moreUrl: [] };
    return axios.post<BaseResp<PromoListResp>>(`${api.modules.fesrc}/promo/list`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? { ...response.data.transResp, totalCount: response.data.respHeader.sortPage.totalCount } : emptyResp);
  },
  /**
   * @description 取得熱門活動明細
   */
  postPromoDetail: async (args: PromoDetailReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PromoDetailReq>({}, args);
    return axios.post<BaseResp<PromoDetailResp>>(`${api.modules.fesrc}/promo/detail`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 取得熱門推薦商品資料
   * @param args 上行電文
   * @param config Axios 設定
   */
  postRecommendProd: async (args: RecommendProdReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<RecommendProdReq>({}, args);
    return axios.post<BaseResp<RecommendProdResp>>(`${api.modules.fesrc}/recommendProd`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 發送 OTP 驗證碼
   * @param args 上行電文
   * @param config Axios 設定
   */
  postOtpSend: async (args: OtpSendReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<OtpSendReq>({}, args);
    return axios.post<BaseResp<OtpSendResp>>(`${api.modules.aauthserv}/otp/send`, argsModel, mergedConfig)
      .then(response => response.data.transResp);
  },
  /**
   * @description 驗證 OTP 驗證碼
   * @param args 上行電文
   * @param config Axios 設定
   */
  postOtpVerify: async (args: OtpVerifyReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<OtpVerifyReq>({}, args);
    return axios.post<BaseResp<OtpVerifyResp>>(`${api.modules.aauthserv}/otp/verify`, argsModel, mergedConfig)
      .then(response => response.data.transResp);
  },
  /**
   * @description 查詢系統參數
   * @param args 上行電文
   * @param config Axios 設定
   */
  postParams: async (args: ParamsReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<ParamsReq>({}, args);
    return axios.post<BaseResp<ParamsResp>>(`${api.modules.sysmgmt}/params`, argsModel, mergedConfig)
      .then(response => response.data.transResp.enum);
  },
  /**
   * @description 取得住火險方案內容
   * @param args 上行電文
   * @param config Axios 設定
   */
  postCampaign: async (args: CampaignReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<CampaignReq>({}, args);
    return axios.post<BaseResp<CampaignResp>>(`${api.modules.coreprod}/campaign`, argsModel, mergedConfig)
      .then(response => response.data.transResp.campaigns);
  },
  /**
   * @description 計算建築物建議保額
   * @param args 上行電文
   * @param config Axios 設定
   */
  postBuildingInsuamtPropose: async (args: BuildingInsuamtReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<BuildingInsuamtReq>({}, args);
    return axios.post<BaseResp<BuildingInsuamtResp>>(`${api.modules.insuserv}/building/insuamt/propose`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 住火險保費計算
   * @param args 上行電文
   * @param config Axios 設定
   */
  postPremiumFire: async (args: PremiumFireReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PremiumFireReq>({}, args);
    return axios.post<BaseResp<PremiumFireResp>>(`${api.modules.insuserv}/premium/fire`, argsModel, mergedConfig)
      .then(response => response.data.transResp.premium);
  },
  /**
   * @description 取得各縣市、行政區域選單
   * @param args 上行電文
   * @param config Axios 設定
   */
  postCityArea: async (args: CityAreaReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<CityAreaReq>({}, args);
    return axios.post<BaseResp<CityAreaResp>>(`${api.modules.sysmgmt}/cityArea`, argsModel, mergedConfig)
      .then(response => response.data.transResp.city);
  },
  /**
   * @description 查詢火險抵押權人銀行清單
   * @param args 上行電文
   * @param config Axios 設定
   */
  postMorgage: async (args: MorgageReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<MorgageReq>({}, args);
    return axios.post<BaseResp<MorgageResp>>(`${api.modules.sysmgmt}/morgage`, argsModel, mergedConfig)
      .then(response => response.data.transResp.banks);
  },
  /**
   * @description 查詢可用繳費方式
   * @param args 上行電文
   * @param config Axios 設定
   */
  postPayby: async (args: PaybyReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaybyReq>({}, args);
    return axios.post<BaseResp<PaybyResp>>(`${api.modules.sysmgmt}/payby`, argsModel, mergedConfig)
      .then(response => response.data.transResp.payBy);
  },
  /**
   * @description 查詢銀行清單
   * @param args 上行電文
   * @param config Axios 設定
   */
  postBank: async (args: BankReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<BankReq>({}, args);
    return axios.post<BaseResp<BankResp>>(`${api.modules.sysmgmt}/bank`, argsModel, mergedConfig)
      .then(response => response.data.transResp.banks);
  },
  /**
   * @description 新增住火險保單
   * @param args 上行電文
   * @param config Axios 設定
   */
  postPolicyFire: async (args: PolicyFireReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PolicyFireReq>({}, args);
    return axios.post<BaseResp<PolicyFireResp>>(`${api.modules.insuserv}/policy/fire`, argsModel, mergedConfig)
      .then(response => response.data.transResp);
  },
  /**
   * @description 繳費
   * @param args 上行電文
   * @param config Axios 設定
   */
  postPayment: async (args: PaymentReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaymentReq>({}, args);
    return axios.post<BaseResp<PaymentResp>>(`${api.modules.insuserv}/payment`, argsModel, mergedConfig)
      .then(response => response.data.transResp);
  },
  /**
   * @description 會員登入前置動作（比對 Captcha）
   * @param args 上行電文
   * @param config Axios 設定
   */
  postSigninPre: async (args: SigninPreReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<SigninPreReq>({}, args);
    return axios.post<BaseResp<SigninPreResp>>(`${api.modules.femem}/signin/pre`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 會員登入（比對 Captcha 與 OTP）
   * @param args 上行電文
   * @param config Axios 設定
   */
  postSignin: async (args: SigninReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<SigninReq>({}, args);
    return axios.post<BaseResp<SigninResp>>(`${api.modules.femem}/signin`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 會員聯絡資訊 OTP
   * @param args 上行電文
   * @param config Axios 設定
   */
  postSingupOtp: async (args: SignupOtpReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<SignupOtpReq>({}, args);
    return axios.post<BaseResp<SignupOtpResp>>(`${api.modules.femem}/signup/otp`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 發送圖形驗證碼
   * @param args 上行電文
   * @param config Axios 設定
   */
  postCaptcha: async (args: CaptchaGetReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<CaptchaGetReq>({}, args);
    return axios.post<BaseResp<CaptchaGetResp>>(`${api.modules.uniserv}/captcha/get`, argsModel, mergedConfig)
      .then(response => response.data.transResp);
  },
  /**
   * @description 會員登出
   * @param args 上行電文
   * @param config Axios 設定
   */
  postSignout: async (args: SignoutReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<SignoutReq>({}, args);
    return axios.post<BaseResp<SignoutResp>>(`${api.modules.femem}/signout`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 會員註冊
   * @param args 上行電文
   * @param config Axios 設定
   */
  postMemRegister: async (args: MemRegReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<MemRegReq>({}, args);
    return axios.post<BaseResp<MemRegResp>>(`${api.modules.femem}/register`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 會員詳細資料
   * @param args 上行電文
   * @param config Axios 設定
   */
  postMemDetail: async (args: MemDetailReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<MemDetailReq>({}, args);
    return axios.post<BaseResp<MemDetailResp>>(`${api.modules.femem}/detail`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 會員修改
   * @param args 上行電文
   * @param config Axios 設定
   */
  postMemUpd: async (args: MemReqUd, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<MemReqUd>({}, args);
    return axios.post<BaseResp<MemResp>>(`${api.modules.femem}/memupd`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢可繳費之保單列表 (會員)
   * @param args 上行電文
   * @param config Axios 設定
   */
  postServicePaymentListMem: async (args: PaymentListMemReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaymentListMemReq>({}, args);
    return axios.post<BaseResp<PaymentListMemResp>>(`${api.modules.insuserv}/payment/list/mem`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢可繳費之保單列表 (非會員)
   * @param args 上行電文
   * @param config Axios 設定
   */
  postServicePaymentList: async (args: PaymentListReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaymentListReq>({}, args);
    return axios.post<BaseResp<PaymentListResp>>(`${api.modules.insuserv}/payment/list`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢可繳費之保單列表 (非會員-單筆)
   * @param args 上行電文
   * @param config Axios 設定
   */
  postServicePaymentSingle: async (args: PaymentSingleReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaymentSingleReq>({}, args);
    return axios.post<BaseResp<PaymentSingleResp>>(`${api.modules.insuserv}/payment/single`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢可繳費之保單詳細資料
   * @param args 上行電文
   * @param config Axios 設定
   */
  postServicePaymentDetail: async (args: PaymentDetailReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PaymentDetailReq>({}, args);
    return axios.post<BaseResp<PaymentDetailResp>>(`${api.modules.insuserv}/payment/detail`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢受理編號
   * @param args 上行電文
   * @param config Axios 設定
   */
  postVerifyApplyNo: async (args: VerifyApplyNoReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<VerifyApplyNoReq>({}, args);
    return axios.post<BaseResp<VerifyApplyNoResp>>(`${api.modules.insuserv}/verify/applyno`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 保單列表查詢 (會員)
   * @param header 表頭
   * @param args 上行電文
   * @param config Axios 設定
   */
  postServicePolicyList: async (header: ReqHeader, args: PolicyListReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PolicyListReq>(header, args);
    return axios.post<BaseResp<PolicyListResp>>(`${api.modules.insuserv}/policy/list/mem`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response)
        ? response.data.transResp
        : null
      );
  },
  /**
   * @description 保單列表查詢 (非會員)
   */
  postServicePolicySingle: async (args: PolicySingleReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PolicySingleReq>({}, args);
    return axios.post<BaseResp<PolicySingleResp>>(`${api.modules.insuserv}/policy/single`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  },
  /**
   * @description 查詢保單明細 (住火險)
   */
  postServicePolicyDetailFire: async (args: PolicyDetailFireReq, config?: AxiosRequestConfig) => {
    const mergedConfig = combineConfig(config);
    const argsModel = combineBaseReq<PolicyDetailFireReq>({}, args);
    return axios.post<BaseResp<PolicyDetailFireResp>>(`${api.modules.insuserv}/policy/detail/fire`, argsModel, mergedConfig)
      .then(response => commonService.isHttpRespSuccess(response) ? response.data.transResp : null);
  }
};
