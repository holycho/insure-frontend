import { NewsDetailReq } from 'app/bff/models/news/detail';
import { News } from 'app/bff/models/news/list';
import { PromoDetailReq } from 'app/bff/models/promo/detail';
import { Promo } from 'app/bff/models/promo/list';
import commonService from 'app/core/services/commonService';
import { fetchNewsDetailAction, fetchPromoDetailAction } from 'app/store/activity/actions';
import { RootState } from 'app/store/types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Bulletins: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const newsState = useSelector((state: RootState) => state.home.main.news);
  const promoState = useSelector((state: RootState) => state.home.main.promo);
  const [mobileTab, setMobileTab] = useState('news');

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 處理 onClick 執行的事件
   * @param data 最新消息
   */
  const handleNewsClick = (data: News) => {
    const args: NewsDetailReq = {
      newsSn: data.sn
    };
    reduxDispatch(fetchNewsDetailAction(args, data));
  };

  /**
   * @description 處理 onClick 執行的事件
   * @param data 熱門活動
   */
  const handlePromoClick = (data: Promo) => {
    const args: PromoDetailReq = {
      promoSn: data.sn
    };
    reduxDispatch(fetchPromoDetailAction(args, data));
  };

  return (
    <div className="main-section main-section--gray main-section--pb-72 main-section--lg-pb-143">
      <div className="main-section__inner">
        <div className="main-section__head">
          <div className="main-section__title main-section__title--main main-section__title--center">訊息中心</div>
        </div>
        <div className="main-section__content">
          <div className="index-bulletin-wrapper">
            {/* PC 版切版(從新逸函式庫抽取並調整為 React 元件功能) */}
            <div className="index-bulletin-wrapper__pc">
              {/* 最新消息 */}
              <div className="index-bulletin">
                <div className="index-bulletin__inner">
                  <div className="index-bulletin__title">最新消息</div>
                  <div className="index-bulletin-list">
                    {newsState.news.length > 0 && (
                      newsState.news.map((it, index) => (
                        <div style={{ cursor: 'pointer' }} key={`news-${index}`} className="index-bulletin-list__item index-bulletin-item" onClick={() => handleNewsClick(it)}>
                          <div className="index-bulletin-item__date">{commonService.convertToADDate(it.startTime)}</div>
                          <div className="index-bulletin-item__title">{it.subject}</div>
                        </div>
                      ))
                    )}
                  </div>
                  {newsState.moreUrl.length > 0 && newsState.moreUrl.map((it, index) => (
                    <div style={{ cursor: 'pointer' }} key={`news-moreUrl-${index}`} className="index-bulletin__btn btn-primary" onClick={() => {
                      // 導頁至列表頁
                      if (it.link) routerHistory.push(it.link);
                    }}>更多消息</div>
                  ))}
                </div>
              </div>
              {/* 熱門活動 */}
              <div className="index-bulletin">
                <div className="index-bulletin__inner">
                  <div className="index-bulletin__title">熱門活動</div>
                  <div className="index-bulletin-list">
                    {promoState.promo.length > 0 && (
                      promoState.promo.map((it, index) => (
                        <div style={{ cursor: 'pointer' }} key={`promo-${index}`} className="index-bulletin-list__item index-bulletin-item" onClick={() => handlePromoClick(it)}>
                          <div className="index-bulletin-item__date">{it.startTime}</div>
                          <div className="index-bulletin-item__title">{it.subject}</div>
                        </div>
                      ))
                    )}
                  </div>
                  {promoState.moreUrl.length > 0 && promoState.moreUrl.map((it, index) => (
                    <div style={{ cursor: 'pointer' }} key={`promo-moreUrl-${index}`} className="index-bulletin__btn btn-primary" onClick={() => {
                      // 導頁至列表頁
                      if (it.link) routerHistory.push(it.link);
                    }}>更多活動</div>
                  ))}
                </div>
              </div>
            </div>
            {/* mobile 版切版(從新逸函式庫抽取並調整為 React 元件功能) */}
            <div className="index-bulletin-wrapper__mobile index-bulletin-tab nxjq-tab-wrapper">
              {/* Tab 標籤 */}
              <div className="index-bulletin-tab__nav nxjq-tab-nav">
                {[{ tab: '最新消息', type: 'news' }, { tab: '熱門活動', type: 'promo' }].map((it, index) => (
                  <div key={`bulletins-${index}`} className={'index-bulletin-tab__nav-item nxjq-tab-nav__item' + (mobileTab === it.type ? ' nxjq-tab-nav__item--active' : '')} onClick={() => setMobileTab(it.type)}>
                    {it.tab}
                  </div>
                ))}
              </div>
              <div className="index-bulletin-tab__pane-container nxjq-tab-container">
                {/* 最新消息 */}
                <div className={'index-bulletin-tab__pane nxjq-tab-container__pane' + (mobileTab === 'news' ? ' nxjq-tab-container__pane--active' : '')}>
                  <div className="index-bulletin">
                    <div className="index-bulletin__inner">
                      <div className="index-bulletin__title">最新消息</div>
                      <div className="index-bulletin-list">
                        {newsState.news.length > 0 && (
                          newsState.news.map((it, index) => (
                            <div key={`mobile-news-${index}`} className="index-bulletin-list__item index-bulletin-item" onClick={() => handleNewsClick(it)}>
                              <div className="index-bulletin-item__date">{commonService.convertToADDate(it.startTime)}</div>
                              <div className="index-bulletin-item__title">{it.subject}</div>
                            </div>
                          ))
                        )}
                      </div>
                      {newsState.moreUrl.length > 0 && newsState.moreUrl.map((it, index) => (
                        <div key={`mobile-news-moreUrl-${index}`} className="index-bulletin__btn btn-primary" onClick={() => {
                          // 導頁至列表頁
                          if (it.link) routerHistory.push(it.link);
                        }}>更多消息</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 熱門活動 */}
                <div className={'index-bulletin-tab__pane nxjq-tab-container__pane' + (mobileTab === 'promo' ? ' nxjq-tab-container__pane--active' : '')}>
                  <div className="index-bulletin">
                    <div className="index-bulletin__inner">
                      <div className="index-bulletin__title">熱門活動</div>
                      <div className="index-bulletin-list">
                        {promoState.promo.length > 0 && (
                          promoState.promo.map((it, index) => (
                            <div key={`mobile-promo-${index}`} className="index-bulletin-list__item index-bulletin-item" onClick={() => handlePromoClick(it)}>
                              <div className="index-bulletin-item__date">{it.startTime}</div>
                              <div className="index-bulletin-item__title">{it.subject}</div>
                            </div>
                          ))
                        )}
                      </div>
                      {promoState.moreUrl.length > 0 && promoState.moreUrl.map((it, index) => (
                        <div key={`mobile-promo-moreUrl-${index}`} className="index-bulletin__btn btn-primary" onClick={() => {
                          // 導頁至列表頁
                          if (it.link) routerHistory.push(it.link);
                        }}>更多活動</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bulletins;
