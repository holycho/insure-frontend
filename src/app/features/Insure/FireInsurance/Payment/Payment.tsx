import { ROUTES } from 'app/core/router';
import commonService from 'app/core/services/commonService';
import { RootState } from 'app/store/types';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Payment: React.FC = () => {
  const routerHistory = useHistory();
  const paybyState = useSelector((state: RootState) =>state.insure.fireInsurance.static.payBy);

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  const handlePrevClick = () => {
    routerHistory.goBack();
  };

  const handleCreditCardClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD);
  };

  const handleTransferClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER);
  };

  return (
    <div className="inside-page-01-layout__latter">
      <div className="content-display-00">
        <div className="content-display-00__title">
          選擇繳費方式
        </div>
        <div className="content-display-00__content">
          <div className="choose-commodity">
            {paybyState.includes('5') && (
              <div className="choose-commodity__item choose-commodity-item card-style ">
                <div className="choose-commodity-item__img-container">
                  <img src="/assets/img/credit-card.png" alt="信用卡" />
                </div>
                <div className="choose-commodity-item__text-container choose-commodity-item-text-container">
                  <div className="choose-commodity-item-text-container__title">
                    信用卡
                  </div>
                  <div className="choose-commodity-item-text-container__content">
                    僅限本人信用卡
                  </div>
                </div>
                <div className="choose-commodity-item__button-container">
                  <button className="two-card-group-content-button-wrapper__button btn-primary" onClick={handleCreditCardClick}>
                    下一步
                  </button>
                </div>
              </div>
            )}
            {paybyState.includes('6') && (
              <div className="choose-commodity__item choose-commodity-item card-style ">
                <div className="choose-commodity-item__img-container">
                  <img src="/assets/img/transfer-money.png" alt="帳戶轉帳" />
                </div>
                <div className="choose-commodity-item__text-container choose-commodity-item-text-container">
                  <div className="choose-commodity-item-text-container__title">
                    帳戶轉帳
                  </div>
                  <div className="choose-commodity-item-text-container__content">
                    僅限本人存款帳戶
                  </div>
                </div>
                <div className="choose-commodity-item__button-container">
                  <button className="two-card-group-content-button-wrapper__button btn-primary" onClick={handleTransferClick}>
                    下一步
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="content-display-00__link">
          <button onClick={handlePrevClick}>返回上一步</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
