import { http, HttpResponse } from 'msw';
import { BaseReq } from 'app/bff/models/base';
import { Enum, ParamsReq } from 'app/bff/models/params';
import environment from 'environments';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

// 模擬假資料
import unitData from './json/unit.json';
import materialData from './json/material.json';
import roofData from './json/roof.json';
import cityData from './json/city.json';
import costData from './json/cost.json';
import campaignData from './json/campaign.json';
import premiumData from './json/premium.json';
import cityAreaData from './json/cityArea.json';
import feeSrcData from './json/feeSource.json';
import occData from './json/occ.json';
import emailDomain from './json/emailDomain.json';
import morgageData from './json/mortgage.json';
import bankData from './json/bank.json';
import memberData from './json/member.json';
import headerData from './json/header.json';
import paymentPropose from './json/payment/propose.json';
import paymentOnline from './json/payment/online.json';
import paymentDetails from './json/payment/details.json';
import policyCarPropose from './json/queryPolicy/list/car/propose.json';
import policyCarOnline from './json/queryPolicy/list/car/online.json';
import policyMotoPropose from './json/queryPolicy/list/moto/propose.json';
import policyMotoOnline from './json/queryPolicy/list/moto/online.json';
import policyFirePolicies from './json/queryPolicy/list/fire/policies.json';
import policyTravelPolicies from './json/queryPolicy/list/travel/policies.json';
import policyPetPolicies from './json/queryPolicy/list/pet/policies.json';
import policyFireDetailPolicies from './json/queryPolicy/detail/fire/policies.json';
import buildingInsuamtPropose from './json/buildingInsuamt/propose.json';
import topsales from './json/topsales.json';
import banner from './json/banner.json';
import newsList from './json/news/list.json';
import newsMoreUrl from './json/news/moreUrl.json';
import newsDetail from './json/news/detail.json';
import promoList from './json/promo/list.json';
import promoMoreUrl from './json/promo/moreUrl.json';
import promoDetail from './json/promo/detail.json';

import { PaymentReq, PaymentResp } from 'app/bff/models/payment';
import { SigninPreReq, SigninPreResp } from 'app/bff/models/signinPre';
import { SigninReq, SigninResp } from 'app/bff/models/signin';
import { CaptchaGetReq, CaptchaGetResp } from 'app/bff/models/captchaGet';
import { OtpSendReq } from 'app/bff/models/otp/otpSend';
import { SignoutResp } from 'app/bff/models/signout';
import { Mem, MemDetailReq, MemDetailResp } from 'app/bff/models/memDetail';
import { LinkUrlReq, LinkUrlResp } from 'app/bff/models/linkUrl';
import { PaymentListMemResp, Policy as PaymentPolicy } from 'app/bff/models/service/paymentListMem';
import { PaymentListReq, PaymentListResp } from 'app/bff/models/service/paymentList';
import { VerifyApplyNoResp } from 'app/bff/models/verifyApplyNo';
import { PaymentDetailReq, PaymentDetailResp } from 'app/bff/models/service/paymentDetail';
import { PolicyListReq, PolicyListResp, Policy } from 'app/bff/models/service/policyList';
import { ProdIdEnum } from 'app/bff/enums/prod';
import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { PolicySingleReq, PolicySingleResp } from 'app/bff/models/service/policySingle';
import { PaymentSingleReq, PaymentSingleResp } from 'app/bff/models/service/paymentSingle';
import { PolicyDetailFireReq, PolicyDetailFireResp } from 'app/bff/models/service/policyDetailFire';
import { PremiumFireReq } from 'app/bff/models/premiumFire';
import { BuildingInsuamtReq } from 'app/bff/models/buildingInsuamt';
import { SignupOtpReq, SignupOtpResp } from 'app/bff/models/signupOtp';
import { MemReqUd } from 'app/bff/models/mem/memReqUd';
import { MemData, OTP } from './types';
import { MemRegReq, MemRegResp } from 'app/bff/models/memReg';
import { RecommendProdResp } from 'app/bff/models/recommendProd';
// 提供 API 模擬資料庫 CURD
import dbService from './utils/dbService';
import jwtService from './utils/jwtService';
import { BannerReq, BannerResp } from 'app/bff/models/banner';
import { NewsListReq } from 'app/bff/models/news/list';
import { PromoListReq, PromoListResp } from 'app/bff/models/promo/list';
import { NewsDetailReq, NewsDetailResp } from 'app/bff/models/news/detail';
import { PromoDetailReq, PromoDetailResp } from 'app/bff/models/promo/detail';

let captchaList: CaptchaGetResp[] = [];
let otpList: OTP[] = [];
let memList: MemData[] = [];

async function loadFromIDB() {
  await dbService.initDB();
  await dbService.connect();
  memList = await dbService.getAll('member');
}
loadFromIDB();

// 使用前端環境配置模擬後台
const { resources, api } = environment.backend;

export const handlers = [
  http.post(`${resources.api}${api.modules.fesrc}/linkUrl`, async ({ request }) => {
    // 取得請求的 body 內容
    const body: BaseReq<LinkUrlReq> = await request.json() as BaseReq<LinkUrlReq>;
    const transResp: LinkUrlResp = {};
    if (body.transReq) {
      if (body.transReq.page.includes('header')) transResp['header'] = headerData;
    }
    const resp = createSuccessResp<LinkUrlResp>(transResp);
    return HttpResponse.json(resp);
  }),
  http.post(`${resources.api}${api.modules.fesrc}/banner`, async ({ request }) => {
    // 取得請求的 body 內容
    const body: BaseReq<BannerReq> = await request.json() as BaseReq<BannerReq>;
    const transResp: BannerResp = {
      banner: []
    };
    if (body.transReq) {
      const { position } = body.transReq;
      if (position === '01') { // Main
        transResp.banner = banner;
      }
    }
    const resp = createSuccessResp<BannerResp>(transResp);
    return HttpResponse.json(resp);
  }),
  // 取得最新消息列表
  http.post(`${resources.api}${api.modules.fesrc}/news/list`, async ({ request }) => {
    // 取得請求的 body 內容
    const body: BaseReq<NewsListReq> = await request.json() as BaseReq<NewsListReq>;
    let _list = newsList;
    if (body.reqHeader.sortPage?.reqPage && body.reqHeader.sortPage.reqSize) {
      const start = (body.reqHeader.sortPage?.reqPage - 1) * body.reqHeader.sortPage.reqSize;
      const end = (body.reqHeader.sortPage?.reqPage - 1) * body.reqHeader.sortPage.reqSize + body.reqHeader.sortPage.reqSize;
      _list = newsList.slice(start, end);
    }
    const transResp = {
      news: _list,
      moreUrl: newsMoreUrl
    };
    const resp = createSuccessResp(transResp);
    resp.respHeader.sortPage = { totalCount: newsList.length };
    return HttpResponse.json(resp);
  }),
  // 取得最新消息明細
  http.post(`${resources.api}${api.modules.fesrc}/news/detail`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    // 取得請求的 body 內容
    const body: BaseReq<NewsDetailReq> = await request.json() as BaseReq<NewsDetailReq>;
    const sn = body.transReq.newsSn;
    const target = newsList.find(it => it.sn === sn);
    if (!target) {
      errCode = '1003';
      errMsg = '查無資料。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    const transResp: NewsDetailResp = {
      ...newsDetail,
      subject: target.subject,
      subSubject: target.subSubject,
      startTime: target.startTime,
      endTime: target.endTime,
      imgName: target.imgName
    };
    const resp = createSuccessResp<NewsDetailResp>(transResp);
    return HttpResponse.json(resp);
  }),
  // 取得熱門活動列表
  http.post(`${resources.api}${api.modules.fesrc}/promo/list`, async ({ request }) => {
    // 取得請求的 body 內容
    const body: BaseReq<PromoListReq> = await request.json() as BaseReq<PromoListReq>;
    let _list = promoList;
    if (body.reqHeader.sortPage?.reqPage && body.reqHeader.sortPage.reqSize) {
      const start = (body.reqHeader.sortPage?.reqPage - 1) * body.reqHeader.sortPage.reqSize;
      const end = (body.reqHeader.sortPage?.reqPage - 1) * body.reqHeader.sortPage.reqSize + body.reqHeader.sortPage.reqSize;
      _list = promoList.slice(start, end);
    }
    const transResp = {
      promo: _list,
      moreUrl: promoMoreUrl
    };
    const resp = createSuccessResp(transResp);
    resp.respHeader.sortPage = { totalCount: promoList.length };
    return HttpResponse.json(resp);
  }),
  http.post(`${resources.api}${api.modules.fesrc}/promo/detail`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    // 取得請求的 body 內容
    const body: BaseReq<PromoDetailReq> = await request.json() as BaseReq<PromoDetailReq>;
    const sn = body.transReq.promoSn;
    const target = promoList.find(it => it.sn === sn);
    if (!target) {
      errCode = '1003';
      errMsg = '查無資料。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // foodpanda
    if (sn === 2) {
      promoDetail.subPromo.map((it) => {
        // 抽獎活動
        it.awards.map((award) => {
          const col = award.cols.find(it => it.colName === '獎品' && it.colValue.includes('全聯'));
          if (col) {
            col.colValue = 'Foodpanda折價券300元';
          }
        });
        // 中獎名單
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        it.winners && it.winners.map(it => {
          if (it.prize.includes('全聯')) {
            it.prize = 'Foodpanda折價券300元';
          }
        });
      });
    }
    const transResp: PromoDetailResp = {
      ...promoDetail,
      subject: target.subject,
      subSubject: target.subSubject,
      startTime: target.startTime,
      endTime: target.endTime,
      imgName: `pop-banner-0${sn}.png`,
      partnerImgName: target.partnerImgName
    };
    const resp = createSuccessResp<PromoDetailResp>(transResp);
    return HttpResponse.json(resp);
  }),
  http.post(`${resources.api}${api.modules.fesrc}/recommendProd`, async ({ request }) => {
    const resp = createSuccessResp<RecommendProdResp>({
      topsales
    });
    return HttpResponse.json(resp);
  }),
  // 查詢系統參數
  http.post(`${resources.api}${api.modules.sysmgmt}/params`, async ({ request }) => {
    // 取得請求的 body 內容
    const body: BaseReq<ParamsReq> = await request.json() as BaseReq<ParamsReq>;
    let result: Enum[] = [];
    if (body.transReq) {
      switch (body.transReq.paramType) {
        case 'unit':
          // result = unitData;
          result = await dbService.query('sys-param', 'paramType', 'unit');
          break;
        case 'material':
          // result = materialData;
          result = await dbService.query('sys-param', 'paramType', 'material');
          break;
        case 'roof':
          // result = roofData;
          result = await dbService.query('sys-param', 'paramType', 'roof');
          break;
        case 'city':
          // result = cityData;
          result = await dbService.query('sys-param', 'paramType', 'city');
          break;
        case 'cost':
          // result = costData;
          result = await dbService.query('sys-param', 'paramType', 'cost');
          break;
        case 'feeSrc':
          // result = feeSrcData;
          result = await dbService.query('sys-param', 'paramType', 'feeSrc');
          break;
        case 'occ':
          // result = occData;
          result = await dbService.query('sys-param', 'paramType', 'occ');
          break;
        case 'emailDomain':
          // result = emailDomain;
          result = await dbService.query('sys-param', 'paramType', 'emailDomain');
          break;
        default:
          break;
      }
    }
    const transResp = {
      enum: result
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 取得住火險方案內容
  http.post(`${resources.api}${api.modules.coreprod}/campaign`, async () => {
    const transResp = {
      campaigns: campaignData
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 住火險建議保額
  http.post(`${resources.api}${api.modules.insuserv}/building/insuamt/propose`, async ({ request }) => {
    const body: BaseReq<BuildingInsuamtReq> = await request.json() as BaseReq<BuildingInsuamtReq>;
    const { decorationCost, usingArea } = body.transReq;
    const pricePerPing = 70000 + decorationCost;
    const fireAmt = usingArea * pricePerPing;
    const movablePropertyAmt = fireAmt * 0.3;
    const transResp = {
      ...buildingInsuamtPropose,
      constructLevel: 'B',
      constructLevelDesc: '特二等',
      usingArea: usingArea,
      rebuildPrice: fireAmt, // 元
      fireAmount: fireAmt / 10000, // 萬元
      earthquakeAmount: 150, // 萬元
      movablePropertyPrice: (movablePropertyAmt / 10000) > 80 ? 80 : (movablePropertyAmt / 10000) // 萬元
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 住火險保費計算
  http.post(`${resources.api}${api.modules.insuserv}/premium/fire`, async ({ request }) => {
    const body: BaseReq<PremiumFireReq> = await request.json() as BaseReq<PremiumFireReq>;
    const { fireAmount, earthquakeAmount, movablePropertyAmount } = body.transReq;
    const transResp = {
      premium: {
        origin: {
          ...premiumData.origin,
          data: {
            ...premiumData.origin.data,
            fireAmount,
            raiseAmount: movablePropertyAmount,
            earthquakeAmount
          }
        },
        discount: {
          ...premiumData.discount,
          data: {
            ...premiumData.discount.data,
            fireAmount,
            raiseAmount: movablePropertyAmount,
            earthquakeAmount
          }
        }
      }
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 取得各縣市、行政區域選單
  http.post(`${resources.api}${api.modules.sysmgmt}/cityArea`, async () => {
    const transResp = {
      city: cityAreaData
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 查詢火險抵押權人銀行清單
  http.post(`${resources.api}${api.modules.sysmgmt}/morgage`, async () => {
    const transResp = {
      banks: morgageData
    };
    const resp = createSuccessResp(transResp);
    return HttpResponse.json(resp);
  }),
  // 發送 OTP 驗證碼(服務、繳費)
  http.post(`${resources.api}${api.modules.aauthserv}/otp/send`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<OtpSendReq> = await request.json() as BaseReq<OtpSendReq>;
    // 檢查參數
    if (!body.transReq.action || !body.transReq.memberId) {
      errCode = '1001';
      errMsg = '缺少必要參數';
      const argsLost = [];
      if (!body.transReq.action) argsLost.push('action');
      if (!body.transReq.memberId) argsLost.push('memberId');
      errMsg += (': ' + argsLost.join('、'));
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 成功
    if (body && body.transReq && body.transReq.action && body.transReq.memberId) {
      const newSn = Math.floor(1000 + Math.random() * 9000);
      const newCode = Math.floor(100000 + Math.random() * 900000);
      const timestamp = dayjs().add(5, 'm').unix();
      const otpItem = {
        memberId: body.transReq.memberId,
        otpSn: `${newSn}`,
        otpCode: `${newCode}`
      };
      otpList.push(otpItem);
      console.log('%c生成 OTP(服務、繳費): ', 'background: #26bfa5; color: white; padding: 2px 4px;', otpItem);
      const transResp = {
        sn: newSn,
        expireTime: timestamp
      };
      const resp = createSuccessResp(transResp);
      return HttpResponse.json(resp);
    }
    return HttpResponse.json(createFailResp(errCode, errMsg));
  }),
  // 驗證 OTP 驗證碼
  http.post(`${resources.api}${api.modules.aauthserv}/otp/verify`, async () => {
    const resp = createSuccessResp({});
    return HttpResponse.json(resp);
  }),
  // 查詢可用繳費方式
  http.post(`${resources.api}${api.modules.sysmgmt}/payby`, async () => {
    const resp = createSuccessResp({
      payBy: [
        '5', // 信用卡
        '6'  // 銀行帳號
      ]
    });
    return HttpResponse.json(resp);
  }),
  // 查詢銀行清單
  http.post(`${resources.api}${api.modules.sysmgmt}/bank`, async () => {
    const resp = createSuccessResp({
      banks: bankData
    });
    return HttpResponse.json(resp);
  }),
  // 新增住火險保單
  http.post(`${resources.api}${api.modules.insuserv}/policy/fire`, async () => {
    const resp = createSuccessResp({
      applyNo: '3421F071300003'
    });
    return HttpResponse.json(resp);
  }),
  // 繳費
  http.post(`${resources.api}${api.modules.insuserv}/payment`, async ({ request }) => {
    const body: BaseReq<PaymentReq> = await request.json() as BaseReq<PaymentReq>;
    const resp = createSuccessResp<PaymentResp>({
      payBy: body.transReq.payBy,
      planType: body.transReq.planType,
      applyNo: '3421F071300003',
      policyNo: 'FIRE122338831',
      amount: body.transReq.amount
    });
    return HttpResponse.json(resp);
  }),
  // 會員登入前置動作
  http.post(`${resources.api}${api.modules.femem}/signin/pre`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<SigninPreReq> = await request.json() as BaseReq<SigninPreReq>;
    // 尋找會員
    const memExisted = memList.find(it => it.id === body.transReq.memberId);
    console.log(memExisted);
    if (!memExisted) {
      errCode = '1003';
      errMsg = '查無資料。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 驗證碼已過期
    const captchaExisted = captchaList.find(it => it.captchaSn === body.transReq.captchaSn);
    console.log(captchaExisted);
    if (!captchaExisted) {
      errCode = '8005';
      errMsg = '驗證碼已過期。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 驗證碼錯誤
    if (body.transReq.captchaCode !== captchaExisted.captchaCode) {
      errCode = '8002';
      errMsg = '驗證碼錯誤。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 成功
    const memId = body.transReq.memberId;
    if (captchaExisted && body && body.transReq.captchaCode === captchaExisted.captchaCode) {
      captchaList = captchaList.filter(it => it.captchaSn !== body.transReq.captchaSn);
      // 生成欲發送的 OTP，於登入時驗證
      const newSn = Math.floor(1000 + Math.random() * 9000);
      const newCode = Math.floor(100000 + Math.random() * 900000);
      otpList = otpList.filter(it => it.memberId !== body.transReq.memberId);
      const otpItem = {
        memberId: body.transReq.memberId,
        otpSn: `${newSn}`,
        otpCode: body.transReq.mode === 'e2e' ? '000000' : `${newCode}` // 測試 OTP: 000000
      };
      otpList.push(otpItem);
      console.log(`%c生成 OTP(登入驗證-${memId}): `, 'background: #26bfa5; color: white; padding: 2px 4px;', otpItem);
      const resp = createSuccessResp<SigninPreResp>({
        memberSn: memExisted.sn,
        memberName: memExisted.name,
        expireTime: 300
      });
      return HttpResponse.json(resp);
    }
    return HttpResponse.json(createFailResp(errCode, errMsg));
  }),
  // 會員登入
  http.post(`${resources.api}${api.modules.femem}/signin`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<SigninReq> = await request.json() as BaseReq<SigninReq>;
    // 尋找會員
    const memExisted = memList.find(it => it.id === body.transReq.memberId);
    if (!memExisted) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 驗證碼已過期
    const otpExisted = otpList.find(it => it.memberId === body.transReq.memberId);
    if (!otpExisted) {
      errCode = '8005';
      errMsg = '驗證碼已過期。';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // 成功
    if (otpExisted && body.transReq && body.transReq.otpCode === otpExisted.otpCode) {
      otpList = otpList.filter(it => it.otpCode);
      const resp = createSuccessResp<SigninResp>({
        member: {
          sn: memExisted.sn,
          name: memExisted.name
        },
        token: memExisted.token
      });
      return HttpResponse.json(resp);
    }
    return HttpResponse.json(createFailResp(errCode, errMsg));
  }),
  // 會員聯絡資訊OTP
  http.post(`${resources.api}${api.modules.femem}/signup/otp`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<SignupOtpReq> = await request.json() as BaseReq<SignupOtpReq>;
    if (body.transReq.action === '4') {
      // 根據 token 回查會員資料
      const token = request.headers.get('Authorization')?.replace('Bearer ', '');
      const memExisted = memList.find(it => it.token === token);
      if (!memExisted) {
        errCode = '1003';
        errMsg = '查無資料';
        return HttpResponse.json(createFailResp(errCode, errMsg));
      }
      // 生成欲發送的 OTP，於變更手機或信箱時驗證
      const newSn = Math.floor(1000 + Math.random() * 9000);
      const newCode = Math.floor(100000 + Math.random() * 900000);
      otpList = otpList.filter(it => it.memberId !== memExisted.id);
      const otpItem: OTP = {
        memberId: memExisted.id,
        otpSn: `${newSn}`,
        otpCode: `${newCode}`
      };
      if (body.transReq.action === '4') {
        if (body.transReq.mobile || body.transReq.email) otpItem.changeMobileOrEmail = true;
      }
      console.log('%c生成 OTP(手機或信箱修改):', 'background: #26bfa5; color: white; padding: 2px 4px;', otpItem);
      otpList.push(otpItem);
      const resp = createSuccessResp<SignupOtpResp>({
        sn: newSn.toString(),
        expireTime: 300 // 5 分鐘
      });
      return HttpResponse.json(resp);
    } else {
      const newSn = Math.floor(1000 + Math.random() * 9000);
      const newCode = Math.floor(100000 + Math.random() * 900000);
      otpList = otpList.filter(it => it.mobile !== body.transReq.mobile);
      const otpItem: OTP = {
        mobile: body.transReq.mobile,
        otpSn: `${newSn}`,
        otpCode: `${newCode}`
      };
      console.log('%c生成 OTP(註冊):', 'background: #26bfa5; color: white; padding: 2px 4px;', otpItem);
      otpList.push(otpItem);
      const resp = createSuccessResp<SignupOtpResp>({
        sn: newSn.toString(),
        expireTime: 300 // 5 分鐘
      });
      return HttpResponse.json(resp);
    }
  }),
  // 發送圖形驗證碼
  http.post(`${resources.api}${api.modules.uniserv}/captcha/get`, async ({ request }) => {
    const body: BaseReq<CaptchaGetReq> = await request.json() as BaseReq<CaptchaGetReq>;
    const newSn = Math.floor(1000 + Math.random() * 9000); // 4 碼
    const newCode = Math.floor(100000 + Math.random() * 900000); // 6 碼
    const data = {
      captchaSn: `${newSn}`,
      captchaCode: body.transReq.mode === 'e2e' ? '123456' : `${newCode}`, // 測試圖形驗證碼: 123456
      expireTime: 120
    };
    captchaList.push(data);
    console.log('CAPTCHA QUEUE:', captchaList);
    const resp = createSuccessResp<CaptchaGetResp>(data);
    return HttpResponse.json(resp);
  }),
  // 登出
  http.post(`${resources.api}${api.modules.femem}/signout`, async ({ request }) => {
    // 於主控台雖然看到 {}，實際上仍可提取
    // console.log('登出紀錄: ', request.headers.get('Authorization'));
    const tokenSignout = request.headers.get('Authorization')?.replace('Bearer ', '');
    const memSignout = memList.find(it => it.token === tokenSignout);
    if (memSignout) {
      otpList = otpList.filter(it => it.memberId !== memSignout.id);
    }
    console.log('%cOTP 佇列: ', 'background: #26bfa5; color: white; padding: 2px 4px;', otpList);
    const resp = createSuccessResp<SignoutResp>({});
    return HttpResponse.json(resp);
  }),
  // 會員註冊
  http.post(`${resources.api}${api.modules.femem}/register`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<MemRegReq> = await request.json() as BaseReq<MemRegReq>;
    const otpItem = otpList.find(it => it.otpSn === body.transReq.otp?.sn);
    if (!otpItem || otpItem.otpCode !== body.transReq.otp?.otpCode) {
      errCode = '8002';
      errMsg = '驗證失敗';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // const newSn = '655040d0-4bd6-455e-afbf-10fb9f6a06b6';
    // const newToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzbiI6IjY1NTA0MGQwLTRiZDYtNDU1ZS1hZmJmLTEwZmI5ZjZhMDZiNiIsIm5hbWUiOiLmnpfosp3osp0iLCJpYXQiOjE3MjM3ODc2ODd9.aDoCODQcnSegvTeh9eNzStYaMOttmHFKW7jJbeNHXzI';
    const newSn = uuid();
    const payload = {
      'sn': newSn,
      'name': body.transReq.mem.name,
      // 'iat': 1723787687
      'iat': Date.now() / 1000
    };
    const newToken = await jwtService.getJwtToken('HS256', payload, 'Dw/G:+@%VR[a$LV,D4L{5+(4I}+zf+ER');
    const memData: MemData = {
      id: body.transReq.mem.id,
      name: body.transReq.mem.name,
      mobile: body.transReq.mem.mobile,
      birthday: body.transReq.mem.birthday,
      gender: 'NA',
      groupCoLtdId: null,
      groupEmpId: null,
      groupRelation: null,
      groupUnitId: null,
      marriage: '0',
      telAreaNo: body.transReq.mem.telAreaNo,
      telExtNo: body.transReq.mem.telExtNo,
      telNo: body.transReq.mem.telNo,
      emailAddr: body.transReq.mem.emailAddr,
      postCode: body.transReq.mem.postCode,
      cityId: body.transReq.mem.cityId,
      areaId: body.transReq.mem.areaId,
      address: body.transReq.mem.address,
      registerTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      adFlag: body.transReq.mem.adFlag,
      inviteCode: null,
      sn: newSn,
      token: newToken
    };
    dbService.add('member', memData);
    const resp = createSuccessResp<MemRegResp>({
      privateInviteCode: 'BA1F68',
      pvtInvCodeBAR: '',
      pvtInvCodeQR: '',
      token: newToken,
      memSn: newSn
    });
    memList = await dbService.getAll('member');
    return HttpResponse.json(resp);
  }),
  // 會員詳細資料
  http.post(`${resources.api}${api.modules.femem}/detail`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<MemDetailReq> = await request.json() as BaseReq<MemDetailReq>;
    const memExisted = memList.find(it => it.sn === body.transReq.sn);
    if (!memExisted) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    // eslint-disable-next-line
    const { token, sn, ...memInfo } = memExisted;
    const resp = createSuccessResp<MemDetailResp>({
      mem: {
        ...memInfo
      }
    });
    return HttpResponse.json(resp);
  }),
  // 會員資料修改
  http.post(`${resources.api}${api.modules.femem}/memupd`, async ({ request }) => {
    // 模擬驗證邏輯
    let errCode = '9999';
    let errMsg = '未知錯誤';
    // 根據 token 回查會員資料
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const memExisted = memList.find(it => it.token === token);
    if (!memExisted) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    const body: BaseReq<MemReqUd> = await request.json() as BaseReq<MemReqUd>;
    if (body.transReq.otpSn && body.transReq.otpCode) {
      const data = otpList.find(it => it.otpSn === body.transReq.otpSn);
      if (!data || data.otpCode !== body.transReq.otpCode) {
        errCode = '8002';
        errMsg = '驗證失敗';
        return HttpResponse.json(createFailResp(errCode, errMsg));
      }
    }
    // 變更會員資料
    memExisted.name = body.transReq.name;
    memExisted.birthday = body.transReq.birthday;
    memExisted.mobile = body.transReq.mobile;
    memExisted.emailAddr = body.transReq.emailAddr;
    memExisted.telAreaNo = body.transReq.telAreaNo;
    memExisted.telNo = body.transReq.telNo;
    memExisted.telExtNo = body.transReq.telExtNo;
    memExisted.postCode = body.transReq.postCode;
    memExisted.cityId = body.transReq.cityId;
    memExisted.areaId = body.transReq.areaId;
    memExisted.address = body.transReq.address;
    memExisted.adFlag = body.transReq.adFlag;
    // storageService.setItem(StorageKeysEnum.MockDB, JSON.stringify({ member: [memExisted]}));
    await dbService.update('member', memExisted);
    const resp = createSuccessResp<SignoutResp>({});
    return HttpResponse.json(resp);
  }),
  // 查詢可繳費之保單列表 (會員)
  http.post(`${resources.api}${api.modules.insuserv}/payment/list/mem`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const memExisted = memList.find(it => it.token === token);
    if (!memExisted) {
      errCode = '8004';
      errMsg = '非法的 Token';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    const resp = createSuccessResp<PaymentListMemResp>({
      online: JSON.parse(JSON.stringify(paymentOnline)) as PaymentPolicy[],
      propose: JSON.parse(JSON.stringify(paymentPropose)) as PaymentPolicy[]
    });
    return HttpResponse.json(resp);
  }),
  // 查詢可繳費之保單列表 (非會員)
  http.post(`${resources.api}${api.modules.insuserv}/payment/list`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<PaymentListReq> = await request.json() as BaseReq<PaymentListReq>;
    const memExisted = memList.find(it => it.id === body.transReq.id);
    // if (!memExisted) {
    //   errCode = '1003';
    //   errMsg = '查無資料';
    //   return HttpResponse.json(createFailResp(errCode, errMsg));
    // }
    const online: PaymentPolicy | undefined = paymentOnline.find(it => it.applyNo === body.transReq.applyNo);
    const propose: PaymentPolicy | undefined = paymentPropose.find(it => it.applyNo === body.transReq.applyNo);
    if (!memExisted || (!online && !propose)) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    const resp = createSuccessResp<PaymentListResp>({
      online: online ? [online] : [],
      propose: propose ? [propose] : []
    });
    return HttpResponse.json(resp);
  }),
  // 查詢可繳費之保單列表 (非會員-單筆)
  http.post(`${resources.api}${api.modules.insuserv}/payment/single`,async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<PaymentSingleReq> = await request.json() as BaseReq<PaymentSingleReq>;
    const memExisted = memList.find(it => it.id === body.transReq.id);
    const online: PaymentPolicy | undefined = paymentOnline.find(it => it.applyNo === body.transReq.applyNo);
    const propose: PaymentPolicy | undefined = paymentPropose.find(it => it.applyNo === body.transReq.applyNo);
    if (!memExisted || (!online && !propose)) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    if (online) {
      const resp = createSuccessResp<PaymentSingleResp>({
        policy: online
      });
      return HttpResponse.json(resp);
    }
    if (propose) {
      const resp = createSuccessResp<PaymentSingleResp>({
        policy: propose
      });
      return HttpResponse.json(resp);
    }
    errCode = '1003';
    errMsg = '查無資料';
    return HttpResponse.json(createFailResp(errCode, errMsg));
  }),
  // 查詢可繳費之保單詳細資料
  http.post(`${resources.api}${api.modules.insuserv}/payment/detail`, async ({ request }) => {
    const resp = createSuccessResp<PaymentDetailResp>({
      policy: paymentDetails[0].policy
    });
    return HttpResponse.json(resp);
  }),
  // 查詢受理編號
  http.post(`${resources.api}${api.modules.insuserv}/verify/applyno`, async ({ request }) => {
    const resp = createSuccessResp<VerifyApplyNoResp>({
      resultMsg: '受理編號已發送至您的信箱'
    });
    return HttpResponse.json(resp);
  }),
  // 保單列表查詢 (會員)
  http.post(`${resources.api}${api.modules.insuserv}/policy/list/mem`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<PolicyListReq> = await request.json() as BaseReq<PolicyListReq>;
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    const memExisted = memList.find(it => it.token === token);
    if (!memExisted) {
      errCode = '8004';
      errMsg = '非法的 Token';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    let policys: Policy[] = [];
    // 根據商品代碼回傳對應列表
    switch (body.transReq.productId) {
      case ProdIdEnum.Auto: {
        if (body.transReq.bcType === InsureModeCodesEnum.Propose) {
          policys = JSON.parse(JSON.stringify(policyCarOnline)) as Policy[];
        }
        if (body.transReq.bcType === InsureModeCodesEnum.Apply) {
          policys = JSON.parse(JSON.stringify(policyCarPropose)) as Policy[];
        }
        break;
      }
      case ProdIdEnum.Moto: {
        if (body.transReq.bcType === InsureModeCodesEnum.Propose) {
          policys = JSON.parse(JSON.stringify(policyMotoOnline)) as Policy[];
        }
        if (body.transReq.bcType === InsureModeCodesEnum.Apply) {
          policys = JSON.parse(JSON.stringify(policyMotoPropose)) as Policy[];
        }
        break;
      }
      case ProdIdEnum.Fire: {
        policys = JSON.parse(JSON.stringify(policyFirePolicies)) as Policy[];
        break;
      }
      case ProdIdEnum.Travel011: {
        policys = JSON.parse(JSON.stringify(policyTravelPolicies)) as Policy[];
        break;
      }
      case ProdIdEnum.Pet: {
        policys = JSON.parse(JSON.stringify(policyPetPolicies)) as Policy[];
        break;
      }
      default: {
        policys = [];
        break;
      }
    }
    // 模擬後台分頁
    let page = 1;
    let size = 10;
    if (body.reqHeader.sortPage) {
      page = body.reqHeader.sortPage.reqPage;
      size = body.reqHeader.sortPage.reqSize;
    }
    const begin = (page - 1) * size;
    const end = begin + size;

    const resp = createSuccessResp<PolicyListResp>({
      totalCount: policys.length,
      policys: policys.slice(begin, end)
    });
    return HttpResponse.json(resp);
  }),
  // 保單列表查詢 (非會員)
  http.post(`${resources.api}${api.modules.insuserv}/policy/single`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<PolicySingleReq> = await request.json() as BaseReq<PolicySingleReq>;
    const userId = body.transReq.id;
    const applyNo = body.transReq.applyNo;
    const memExisted = memList.find(it => it.id === userId);
    if (!memExisted) {
      errCode = '1003';
      errMsg = '查無資料';
      return HttpResponse.json(createFailResp(errCode, errMsg));
    }
    let _policy;
    if (applyNo.includes('C')) {
      _policy = policyCarOnline.find(it => it.applyNo === applyNo); // 查詢網投
      if (_policy) {
        const resp = createSuccessResp<PolicySingleResp>({
          policy: _policy as Policy
        });
        return HttpResponse.json(resp);
      } else {
        _policy = policyCarPropose.find(it => it.applyNo === applyNo); // 查詢網要
        if (_policy) {
          const resp = createSuccessResp<PolicySingleResp>({
            policy: _policy as Policy
          });
          return HttpResponse.json(resp);
        }
      }
    }
    if (applyNo.includes('M')) {
      _policy = policyMotoOnline.find(it => it.applyNo === applyNo); // 查詢網投
      if (_policy) {
        const resp = createSuccessResp<PolicySingleResp>({
          policy: _policy as Policy
        });
        return HttpResponse.json(resp);
      } else {
        _policy = policyMotoPropose.find(it => it.applyNo === applyNo); // 查詢網要
        if (_policy) {
          const resp = createSuccessResp<PolicySingleResp>({
            policy: _policy as Policy
          });
          return HttpResponse.json(resp);
        }
      }
    }
    if (applyNo.includes('F')) {
      _policy = policyFirePolicies.find(it => it.applyNo === applyNo);
      const resp = createSuccessResp<PolicySingleResp>({
        policy: _policy as Policy
      });
      return HttpResponse.json(resp);
    }

    errCode = '1003';
    errMsg = '查無資料';
    return HttpResponse.json(createFailResp(errCode, errMsg));
  }),
  // 住火險保單明細查詢
  http.post(`${resources.api}${api.modules.insuserv}/policy/detail/fire`, async ({ request }) => {
    let errCode = '9999';
    let errMsg = '未知錯誤';
    const body: BaseReq<PolicyDetailFireReq> = await request.json() as BaseReq<PolicyDetailFireReq>;
    const applyNo = body.transReq.applyNo;
    const find = policyFireDetailPolicies.find(it => it.policyInfo.applyNo === applyNo);
    if (find) {
      const resp = createSuccessResp<PolicyDetailFireResp>({
        ...find as PolicyDetailFireResp
      });
      return HttpResponse.json(resp);
    }
    errCode = '1003';
    errMsg = '查無資料';
    return HttpResponse.json(createFailResp(errCode, errMsg));
  })
];

const createSuccessResp = <T>(transResp: T) => {
  return {
    respHeader: {
      sessionId: `TEST${dayjs().unix()}`,
      txnSeq: uuid(),
      returnCode: '0000',
      returnMsg: '成功',
      sortPage: {}
    },
    transResp
  };
};

const createFailResp = (returnCode: string, returnMsg: string) => {
  return {
    respHeader: {
      token: '',
      sessionId: `TEST${dayjs().unix()}`,
      txnSeq: uuid(),
      returnCode,
      returnMsg,
      sortPage: {}
    }
  };
};