import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Policy } from 'app/bff/models/service/paymentListMem';
import { RootState } from 'app/store/types';
import { fetchPaymentListWithMemberAction, fetchPaymentListWithNonMemberAction } from 'app/store/service/payment/actions';
import commonService from 'app/core/services/commonService';
import PaymentTable from 'app/common/compoments/TransposingTable/PaymentTable';
import { ListRouteLocationState } from './types';

const List: React.FC = () => {
  const routerLocation = useLocation<ListRouteLocationState>(); // 非會員會傳參數 id, applyNo
  const reduxDispatch = useDispatch();
  const authorization = useSelector((state: RootState) => state.system.member.authorization);
  const listState = useSelector((state: RootState) => state.service.payment.list);
  const onlineState = listState.online;
  const proposeState = listState.propose;
  const singleState = useSelector((state: RootState) => state.service.payment.single);

  /**
   * @description 查詢可繳費之保單列表 (會員)
   */
  const fetchPaymentListWithMember = useCallback(() => {
    reduxDispatch(fetchPaymentListWithMemberAction({}));
  }, [reduxDispatch]);

  /**
   * @description 查詢可繳費之保單列表 (非會員)
   *              根據傳入的 state 生成函數實體
   */
  const fetchPaymentListWithNonMember = useCallback(() => {
    if (!routerLocation.state.id || !routerLocation.state.applyNo) return;
    reduxDispatch(fetchPaymentListWithNonMemberAction({
      id: routerLocation.state.id,
      applyNo: routerLocation.state.applyNo
    }));
  }, [reduxDispatch, routerLocation.state]);

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 針對登入狀態執行對應的查詢
   */
  useEffect(() => {
    // authorization
    //   ? fetchPaymentListWithMember()
    //   : fetchPaymentListWithNonMember();
    // 非會員已於前一頁查詢可繳費保單，若無資料或查詢失敗則不轉跳到此頁
    if (authorization) {
      fetchPaymentListWithMember();
    }
  }, [authorization, fetchPaymentListWithMember, fetchPaymentListWithNonMember, reduxDispatch]);

  /**
   * @description 網投繳費流程
   * @param policy 保單資訊
   */
  const handleVerifyProcess = (policy: Policy) => {
    console.log('網投繳費', policy);
  };

  /**
   * @description 網要繳費流程
   * @param policy 保單資訊
   */
  const handlePaymentProcess = (policy: Policy) => {
    console.log('網要繳費', policy);
  };

  /**
   * @description 非會員繳費流程
   * @param policy 保單資訊
   */
  const handlePaymentNonMember = (policy: Policy) => {
    console.log('非會員繳費', policy);
  };

  return (
    <div className="inside-page-01-layout__latter inside-page-01-layout__latter--typeA inside-page-01-layout__latter--result">
      <div className="result-layout-00">
        <div className="result-layout-00__content">
          {authorization ? (
            <div className="result-layout-00__block">
              {/* 網路投保 */}
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">網路投保</div>
                <div className="form-layout-00__body form-layout-00__body--type-3">
                  <PaymentTable
                    policys={onlineState}
                    emptyMessage="目前無網路投保的相關條目"
                    executeVerify={handleVerifyProcess}
                  />
                </div>
              </div>
              {/* 網路要保 */}
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">網路要保</div>
                <div className="form-layout-00__body form-layout-00__body--type-3">
                  <PaymentTable
                    policys={proposeState}
                    emptyMessage="目前無網路要保的相關條目"
                    executePayment={handlePaymentProcess}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="result-layout-00__block">
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">查詢結果</div>
                <div className="form-layout-00__body form-layout-00__body--type-3">
                  <PaymentTable
                    policys={singleState.policy ? [singleState.policy] : []}
                    emptyMessage="目前無符合的條目"
                    executePayment={handlePaymentNonMember}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
