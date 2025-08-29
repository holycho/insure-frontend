import TextCollectionSection from 'app/common/compoments/TextCollectionSection';
import TextCollectionTable from 'app/common/compoments/TextCollectionTable';
import commonService from 'app/core/services/commonService';
import { RootState } from 'app/store/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { ClockCircleOutlined } from '@ant-design/icons';

const styles: { [key: string]: React.CSSProperties } = {
  Main: {
    color: 'white',
    textShadow: '2px 3px 5px rgb(80, 80, 80)'
  }
};

const Detail: React.FC = () => {
  const detailState = useSelector((state: RootState) => state.activity.news.detail);

  /**
   * @description 處理「保險期間」顯示
   */
  const displayDuration = () => {
    if (!detailState || !detailState.startTime || !detailState.endTime) return null;
    const startTimeAD = commonService.convertToADDate(detailState.startTime);
    const endTimeAD = commonService.convertToADDate(detailState.endTime);
    return `${startTimeAD}-${endTimeAD}`;
  };

  return (
    <>
      {detailState && (
        <div className="inside-page-00-showcase">
          <div className="inside-page-00-showcase__former">
            <div className="inside-page-00-banner">
              <div className="inside-page-00-banner__bg" style={{ backgroundImage: `url(${require('assets/img/latest-news-banner.png')})` }} />
              <div className="inside-page-00-banner__inner">
                <div className="inside-page-02-banner__former">
                  <div style={styles.Main} className="inside-page-02-banner__title inside-page-00-banner__title--main">最新消息</div>
                </div>
              </div>
            </div>
          </div>
          <div className="inside-page-02-showcase__latter inside-page-02-showcase-latter">
            <div className="title-information-card">
              <div className="title-information-card__title">{detailState.subject}</div>
              <div className="title-information-card__subtitle-and-date-container subtitle-and-date-container">
                <div className="subtitle-and-date-container__description">{detailState.subSubject}</div>
                <div style={{ minWidth: 230, textAlign: 'end', display: 'flex', alignItems: 'center' }} className="subtitle-and-date-container__date">
                  {/* <span className="text-collection__with-left-clock margin-top-negative-5">{displayDuration()}
                  </span> */}
                  <ClockCircleOutlined style={{ fontSize: 18, color: '#DC143C', marginRight: 5 }} />
                  <span className="text-collection__without-clock margin-top-negative-5">{displayDuration()}</span>
                </div>
              </div>
              <div className="title-information-card__gap-line" />
              <div className="inside-page-02-showcase-latter__image">
                <img src={commonService.getImageUrl(detailState.imgName)} alt="" />
              </div>
              <div className="text-collection">
                {detailState.newsDetail.map((it, index) => {
                  if (it.order === 2) {
                    return (
                      <TextCollectionTable
                        id={`news-table-${index}`}
                        key={`section-${index}`}
                        title={it.subject}
                        order={it.order}
                        head={it.head ?? []}
                        awards={it.awards ?? []}
                        winners={[]}
                      />
                    );
                  }
                  return (
                    <TextCollectionSection
                      key={`section-${index}`}
                      title={it.subject}
                      content={it.content ?? []}
                      order={it.order}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
