import { Area } from 'app/bff/models/cityArea';
import { SignupOtpReq } from 'app/bff/models/signupOtp';
import Readonly00 from 'app/common/compoments/Form/Readonly00';
import commonService from 'app/core/services/commonService';
import { sendRegisterOTPAction } from 'app/store/member/register/actions';
import { RootState } from 'app/store/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ConfirmInfo: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const cityAreaState = useSelector((state: RootState) => state.member.register.static.cityArea);
  const registerDataState = useSelector((state: RootState) => state.member.register.data);

  /**
   * @description 初始頁面
   */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, [reduxDispatch]);

  /**
   * @description 處理「返回上一步」執行的事件
   */
  const handlePrevStep = () => {
    routerHistory.goBack();
  };

  /**
   * @description 處理「下一步」執行的事件
   */
  const handleNextStep = () => {
    const args: SignupOtpReq = {
      mobile: registerDataState?.mobile,
      email: registerDataState?.emailAddr,
      action: '7'
    };
    reduxDispatch(sendRegisterOTPAction(args));
  };

  /**
   * @description 顯示中文聯絡地址
   */
  const displayAddress = (cityId?: string, areaId?: string, address?: string, showPostCode: boolean = false) => {
    let fullAddress = '';
    let postCode = '';
    let area: Area[] = [];
    if (cityId) {
      const find = cityAreaState.find(it => it.cityId === cityId);
      if (find) {
        fullAddress += find.cityName;
        area = find.area;
      }
    }
    if (areaId && area) {
      const find = area.find(it => it.areaId === areaId);
      if (find) {
        fullAddress += find.areaName;
        postCode = find.postCode;
      }
    }
    fullAddress += address;
    return showPostCode ? `${postCode}${fullAddress}` : fullAddress;
  };

  return (
    <div className="inside-page-01-layout__latter">
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">會員資料</div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row form-layout-00__row--f-wrap">
            {/* 姓名 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="姓名" content={registerDataState?.name ?? ''} />
              </div>
            </div>
            {/* 身份證字號 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="身份證字號" content={registerDataState?.id ?? ''} />
              </div>
            </div>
            {/* 出生年月日 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="出生年月日" content={registerDataState?.birthday ? commonService.convertToTWDate(registerDataState.birthday) : ''} />
              </div>
            </div>
            {/* 聯絡電話 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="聯絡電話" content={commonService.displayTelephone(registerDataState?.telAreaNo, registerDataState?.telNo, registerDataState?.telExtNo)} />
              </div>
            </div>
            {/* 行動電話 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="行動電話" content={registerDataState?.mobile ?? ''} />
              </div>
            </div>
            {/* 聯絡地址 */}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly00 label="聯絡地址" content={displayAddress(registerDataState?.cityId, registerDataState?.areaId, registerDataState?.address, true)} />
              </div>
            </div>
            {/* 電子郵件 */}
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly00 label="電子郵件" content={registerDataState?.emailAddr ?? ''} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
        <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
          返回上一步
        </button>
        <button type="button" className="inside-page-01-layout__btn btn-primary" onClick={handleNextStep} >
          下一步
        </button>
      </div>
    </div>
  );
};

export default ConfirmInfo;
