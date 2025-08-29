import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortPageReq } from 'app/bff/models/base';
import commonService from 'app/core/services/commonService';
import { fetchNewsDetailAction, initialNewsAction } from 'app/store/activity/actions';
import { RootState } from 'app/store/types';
import { News as NewsItem } from 'app/bff/models/news/list';
import { NewsDetailReq } from 'app/bff/models/news/detail';

const PAGE_SIZE = 10;

const News: React.FC = () => {
  const reduxDispatch = useDispatch();
  const newsState = useSelector((state: RootState) => state.activity.news);
  const [page, setPage] = useState<number>(1);
  const totalPage = Math.ceil(newsState.totalCount / PAGE_SIZE);

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 初始頁面
   */
  useEffect(() => {
    const args: SortPageReq = {
      reqPage: page, // pageRef.current.currentPage,
      reqSize: PAGE_SIZE // pageRef.current.pageSize
    };
    reduxDispatch(initialNewsAction(args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxDispatch]);

  /**
   * @description 取得資料後，導頁至明細頁
   */
  const handleRedirect = (data: NewsItem) => {
    const args: NewsDetailReq = {
      newsSn: data.sn
    };
    reduxDispatch(fetchNewsDetailAction(args, data));
  };

  /**
   * @description 切換至上一個分頁
   */
  const handlePrevClick = () => {
    if (totalPage === 1 || (totalPage > 1 && page === 1)) return;
    const prevPage = page - 1;
    const args: SortPageReq = {
      reqPage: prevPage,
      reqSize: PAGE_SIZE
    };
    reduxDispatch(initialNewsAction(args, () => {
      setPage(prevPage);
    }));
  };

  /**
   * @description 點擊頁碼
   * @param page 頁碼
   */
  const handlePageClick = (page: number) => {
    const args: SortPageReq = {
      reqPage: page,
      reqSize: PAGE_SIZE
    };
    reduxDispatch(initialNewsAction(args, () => {
      setPage(page);
    }));
  };

  /**
   * @description 切換至下一個分頁
   */
  const handleNextClick = () => {
    if (totalPage === 1 || (totalPage > 1 && page === totalPage)) return;
    const nextPage = page + 1;
    const args: SortPageReq = {
      reqPage: nextPage,
      reqSize: PAGE_SIZE
    };
    reduxDispatch(initialNewsAction(args, () => {
      setPage(nextPage);
    }));
  };

  return (
    <>
      <div className="inside-page-00-showcase">
        <div className="inside-page-00-showcase__former">
          <div className="inside-page-00-banner">
            <div className="inside-page-00-banner__bg" style={{ backgroundImage: `url(${require('assets/img/latest-news-banner.png')})` }} />
            <div className="inside-page-00-banner__inner">
              <div className="inside-page-00-banner__former">
                <div style={{ textShadow: '2px 3px 5px #4d4d4d' }} className="inside-page-00-banner__title inside-page-00-banner__title--main">最新消息</div>
                <div style={{ textShadow: '2px 3px 5px #4d4d4d' }} className="inside-page-00-banner__title inside-page-00-banner__title--vice">{`共${newsState.totalCount}則消息`}</div>
              </div>
              <div className="inside-page-00-banner__latter">
              </div>
            </div>
          </div>
        </div>
        <div className="inside-page-00-showcase__latter">
          <div className="card-collection-04">
            <div className="card-collection-04__inner">
              {newsState.list.length > 0 && newsState.list.map((it, index) => (
                <div key={`news-${index}`} className="card-collection-04__item">
                  <div style={{ cursor: 'pointer' }} className="photo-card-02" onClick={() => handleRedirect(it)}>
                    <div className="photo-card-02__former">
                      <div className="photo-card-02__photo">
                        <img src={commonService.getImageUrl(it.imgName)} alt="" />
                      </div>
                    </div>
                    <div className="photo-card-02__latter">
                      <div className="photo-card-02__title">{it.subject}</div>
                      <div className="photo-card-02__content" data-text-trimmer-mode="maxLineNumber" data-text-trimmer-max-line="2" data-text-trimmer-mobile-max-line="4">
                        {it.subSubject}
                      </div>
                      <div className="photo-card-02__descrp">
                        <div className="photo-card-02-descrp__former">
                          活動期間
                        </div>
                        <div className="photo-card-02-descrp-latter">
                          {commonService.displayADDateDuration(it.startTime, it.endTime)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-collection-04__pagination pagination-00">
              <div className={'pagination-00__prev' + (totalPage === 1 || (totalPage > 1 && page === 1) ? ' pagination-00__prev--disabled' : '')} onClick={handlePrevClick} />
              <div className="pagination-00__pages">
                {[...Array(Math.ceil(newsState.totalCount / PAGE_SIZE))].map((_, i) => {
                  return (
                    <div key={`page-${i + 1}`} className={'pagination-00__page' + (i + 1 === page ? ' pagination-00__page--active' : '')} onClick={() => handlePageClick(+(i + 1))}>{i + 1}</div>
                  );
                })}
              </div>
              <div className={'pagination-00__next' + (totalPage === 1 || (totalPage > 1 && page === totalPage) ? ' pagination-00__next--disabled' : '')} onClick={handleNextClick} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;