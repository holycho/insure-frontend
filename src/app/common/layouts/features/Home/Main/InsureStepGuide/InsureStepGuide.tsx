import React from 'react';

const InsureStepGuide: React.FC = () => {
  return (
    <div className="main-section">
      <div className="index-step-guide">
        <div className="index-step-guide__inner">
          <div className="index-step-guide__bg" />
          <div className="index-step-guide__head">
            <div className="index-step-guide__title index-step-guide__title--main">網路投保步驟</div>
            <div className="index-step-guide__title index-step-guide__title--vice">線上專人諮詢服務</div>
          </div>
          <div className="index-step-guide__content">
            <ul className="index-step-guide__step-ul">
              <li className="index-step-guide__step-li index-step-guide-item">
                <div className="index-step-guide-item__num">
                  {/* <img src="./assets/img/num1.svg" alt="" className="img" /> */}
                  <div className="text">1</div>
                </div>
                <div className="index-step-guide-item__text">試算保費</div>
              </li>
              <li className="index-step-guide__step-li index-step-guide-item">
                <div className="index-step-guide-item__num">
                  {/* <img src="./assets/img/num2.svg" alt="" className="img" /> */}
                  <div className="text">2</div>
                </div>
                <div className="index-step-guide-item__text">填寫投保資料</div>
              </li>
              <li className="index-step-guide__step-li index-step-guide-item">
                <div className="index-step-guide-item__num">
                  {/* <img src="./assets/img/num3.svg" alt="" className="img" /> */}
                  <div className="text">3</div>
                </div>
                <div className="index-step-guide-item__text">各類繳費支付</div>
              </li>
              <li className="index-step-guide__step-li index-step-guide-item">
                <div className="index-step-guide-item__num">
                  {/* <img src="./assets/img/num4.svg" alt="" className="img" /> */}
                  <div className="text">4</div>
                </div>
                <div className="index-step-guide-item__text">投保完成</div>
              </li>
            </ul>
            <div className="index-step-guide__avatar">
              <img src="./assets/img/payment.png" alt="" className="img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsureStepGuide;
