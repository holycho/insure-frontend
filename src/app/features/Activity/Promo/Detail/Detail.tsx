import { ClockCircleOutlined } from '@ant-design/icons';
import TextCollectionTable from 'app/common/compoments/TextCollectionTable';
import commonService from 'app/core/services/commonService';
import { RootState } from 'app/store/types';
import React from 'react';
import { useSelector } from 'react-redux';

const Detail: React.FC = () => {
  const detailState = useSelector((state: RootState) => state.activity.promo.detail);

  return (
    <>
      {detailState && (
        <div className="inside-page-03-showcase">
          <div className="inside-page-03-showcase__former">
            <div className="inside-page-03-banner">
              <div
                className="inside-page-03-banner__bg"
                style={{ backgroundImage: `url(${commonService.getImageUrl(detailState.imgName)})` }}
              />
            </div>
          </div>
          <div className="inside-page-03-showcase__latter inside-page-03-showcase-latter">
            <div className="inside-page-03-showcase-latter__top">
              {/* 標題與副標題 */}
              <div className="inside-page-03-showcase-latter-top__title_and_subtitle-container inside-page-03-showcase-latter-top-title_and_subtitle-container">
                <div className="inside-page-03-showcase-latter-top-title_and_subtitle-container__title">
                  {detailState.subject}
                </div>
                <div style={{ maxWidth: 800 }} className="inside-page-03-showcase-latter-top-title_and_subtitle-container__subtitle">
                  {detailState.subSubject}
                </div>
              </div>
              {/* 合作廠商 */}
              <div className="inside-page-03-showcase-latter-top__image">
                <img src={commonService.getImageUrl(detailState.partnerImgName)} alt="" />
              </div>
            </div>
            {detailState.subPromo.map((it, index) => {
              const duration = `${commonService.convertToADDate(it.startTime)}-${commonService.convertToADDate(it.endTime)}`;
              return (
                <div key={`sub-promo-${index}`} className="title-information-card padding-bottom-18">
                  <div className="title-information-card__title">{it.subject}</div>
                  <div className="title-information-card__subtitle-and-date-container subtitle-and-date-container">
                    <div className="subtitle-and-date-container__description">{it.subSubject}</div>
                    <div style={{ display: 'flex' }} className="subtitle-and-date-container__date">
                      {/* <span className="text-collection__with-left-clock margin-top-negative-5">
                        {duration}
                      </span> */}
                      <ClockCircleOutlined style={{ fontSize: 18, color: '#DC143C', marginRight: 5 }} />
                      <span className="text-collection__without-clock margin-top-negative-5">{duration}</span>
                    </div>
                  </div>
                  <div className="title-information-card__gap-line" />
                  {/* 抽獎活動 */}
                  <TextCollectionTable
                    id={`award-table-${index}`}
                    title="抽獎活動"
                    order={index}
                    head={it.head}
                    awards={it.awards}
                    winners={[]}
                  />
                  {it.winners && it.winners.length > 0 && (
                    <TextCollectionTable
                      id={`winner-table-${index}`}
                      title="中獎名單"
                      order={index}
                      head={['獎項', '獎品', '得獎人', '保單號碼']}
                      awards={[]}
                      winners={it.winners}
                    />
                  )}
                </div>
              );
            })}
            {detailState.notice ? (
              <div className="title-information-card margin-top-56">
                <div className="text-collection">
                  <div className="text-collection__title">注意事項</div>
                  <ul className="text-collection__ul text-collection__description">
                    {detailState.notice.map((it, index) => (
                      <li key={`notice-${index}`} className="text-collection__li text-collection__description text-collection__description--m">{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
