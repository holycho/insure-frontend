import React from 'react';
import { PaymentTableProps } from './types';
import { Policy } from 'app/bff/models/service/paymentListMem';
import { PolicyTypeCodesEnum } from 'app/bff/enums/policy';
import { PolicyTypeCodeMatchesText } from 'app/core/models/policy/policyTypeCodeMatchesText';

// 說明：客製需求，非視覺團隊提供的樣式，故加在此處
const styles: { [key: string]: React.CSSProperties } = {
  timeTd: {
    width: '29%'
  },
  timeContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const PaymentTable: React.FC<PaymentTableProps> = (props) => {
  /**
   * @description 處理 onClick 執行的事件
   * @param policy 保單資料
   */
  const handlePaymentClick = async (policy: Policy) => {
    if (props.executePayment) props.executePayment(policy);
    if (props.executeVerify) props.executeVerify(policy);
  };

  /**
   * @description 根據保單狀態取得操作按鈕文字
   * @param policy 保單資料
   */
  const getButtonName = (policy: Policy) => {
    let retName = '尚未開放';
    if (policy.expired !== undefined) {
      if (policy.expired) retName = '超過繳費期限';
      else retName = '我要繳費';
    }
    return retName;
  };

  /**
   * @description 是否停用操作按鈕
   * @param policy 保單資料
   */
  const disablePaymentButton = (policy: Policy) => {
    if (policy.expired === undefined) return true;
    if (policy.expired) return true;
    else return false;
  };

  return (
    <div className="transposing-table-00">
      <div className="transposing-table-00">
        {props.policys.length > 0 ? (
          <>
            {/* PC */}
            <div className="transposing-table-00__pc">
              <div className="transposing-table-00-pc">
                <table className="transposing-table-00-pc__table transposing-table-00-pc--setD" style={{ width: '100%' }}>
                  <thead className="transposing-table-00-pc__thead">
                    <tr className="transposing-table-00-pc__tr">
                      <td className="transposing-table-00-pc__td">
                        <div className="transposing-table-00-pc__text transposing-table-00-pc__text--bold">受理編號</div>
                      </td>
                      <td style={styles.timeTd} className="transposing-table-00-pc__td">
                        <div className="transposing-table-00-pc__text transposing-table-00-pc__text--bold">保險期間</div>
                      </td>
                      <td className="transposing-table-00-pc__td">
                        <div className="transposing-table-00-pc__text transposing-table-00-pc__text--bold">車牌號碼</div>
                      </td>
                      <td className="transposing-table-00-pc__td" />
                    </tr>
                  </thead>
                  <tbody className="transposing-table-00-pc__tbody">
                    {props.policys.map((item, index) =>
                      <tr className="transposing-table-00-pc__tr" key={index}>
                        <td className="transposing-table-00-pc__td">
                          <div className={!disablePaymentButton(item) ? 'transposing-table-00-pc__link' : 'transposing-table-00-pc__text'}>{item.applyNo}</div>
                        </td>
                        <td style={styles.timeTd} className="transposing-table-00-pc__td">
                          {/* 汽車險、機車險 強制險 */}
                          {item.cStartDate && (
                            <div className="transposing-table-00-pc__tags transposing-table-00-pc__tags--align-center">
                              <div className="transposing-table-00-pc__tag color-tag color-tag--purple">
                                <div className="color-tag__text">{PolicyTypeCodeMatchesText[PolicyTypeCodesEnum.C]}</div>
                              </div>
                              <div style={styles.timeContainer} className="transposing-table-00-pc__text">
                                <div>{item.cStartDate}&nbsp;~&nbsp;</div>
                                <div>{item.cEndDate}</div>
                              </div>
                            </div>
                          )}
                          {/* 汽車險、機車險 任意險 */}
                          {item.vStartDate && (
                            <div className="transposing-table-00-pc__tags transposing-table-00-pc__tags--align-center">
                              <div className="transposing-table-00-pc__tag color-tag color-tag--purple">
                                <div className="color-tag__text">{PolicyTypeCodeMatchesText[PolicyTypeCodesEnum.V]}</div>
                              </div>
                              <div style={styles.timeContainer} className="transposing-table-00-pc__text">
                                <div>{item.vStartDate}&nbsp;~&nbsp;</div>
                                <div>{item.vEndDate}</div>
                              </div>
                            </div>
                          )}
                          {/* 其他險種 */}
                          {item.startDate && (
                            <div className="transposing-table-00-pc__text transposing-table-00-pc__text--no-wrap">
                              {item.startDate} ~ {item.endDate}
                            </div>
                          )}
                        </td>
                        <td className="transposing-table-00-pc__td">
                          <div className="transposing-table-00-pc__text">{item.carLicense}</div>
                        </td>
                        <td className="transposing-table-00-pc__td">
                          <button type="button" className={'transposing-table-00-pc__btn btn-primary' + (disablePaymentButton(item) ? ' btn-primary--disabled' : '')} onClick={() => handlePaymentClick(item)} disabled={disablePaymentButton(item)}>{getButtonName(item)}</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Mobile */}
            <div className="transposing-table-00__mobile">
              <div className="transposing-table-00-mobile">
                <div className="transposing-table-00-mobile__inner">
                  {props.policys.map((item, index) =>
                    <div className="transposing-table-00-mobile__cell" key={index}>
                      <div className="transposing-table-00-mobile__item">
                        <div className="transposing-table-00-mobile__title">
                          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">受理編號</div>
                        </div>
                        <div className="transposing-table-00-mobile__content">
                          <div className={!disablePaymentButton(item) ? 'transposing-table-00-mobile__link' : 'transposing-table-00-mobile__text'}>{item.applyNo}</div>
                        </div>
                      </div>
                      <div className="transposing-table-00-mobile__item">
                        <div className="transposing-table-00-mobile__title">
                          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">保險期間</div>
                        </div>
                        <div className="transposing-table-00-mobile__content">
                          {/* 汽車險、機車險 強制險 */}
                          {item.cStartDate && (
                            <div className="transposing-table-00-mobile__tags">
                              <div className="transposing-table-00-mobile__tag color-tag color-tag--purple">
                                <div className="color-tag__text">{PolicyTypeCodeMatchesText[PolicyTypeCodesEnum.C]}</div>
                              </div>
                              <div className="transposing-table-00-mobile__text">{item.cStartDate} ~ {item.cEndDate}</div>
                            </div>
                          )}
                          {/* 汽車險、機車險 任意險 */}
                          {item.vStartDate && (
                            <div className="transposing-table-00-mobile__tags">
                              <div className="transposing-table-00-mobile__tag color-tag color-tag--purple">
                                <div className="color-tag__text">{PolicyTypeCodeMatchesText[PolicyTypeCodesEnum.V]}</div>
                              </div>
                              <div className="transposing-table-00-mobile__text">{item.vStartDate} ~ {item.vEndDate}</div>
                            </div>
                          )}
                          {/* 其他險種 */}
                          {item.startDate && (
                            <div className="transposing-table-00-mobile__text">{item.startDate} ~ {item.endDate}</div>
                          )}
                        </div>
                      </div>
                      <div className="transposing-table-00-mobile__item">
                        <div className="transposing-table-00-mobile__title">
                          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">車牌號碼</div>
                        </div>
                        <div className="transposing-table-00-mobile__content">
                          <div className="transposing-table-00-mobile__text">{item.carLicense}</div>
                        </div>
                      </div>
                      <div className="transposing-table-00-mobile__item">
                        <button type="button" className={'transposing-table-00-mobile__btn btn-primary' + (disablePaymentButton(item) ? ' btn-primary--disabled' : '')} onClick={() => handlePaymentClick(item)} disabled={disablePaymentButton(item)}>{getButtonName(item)}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="transposing-table-00__no-data">
            {props.emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
