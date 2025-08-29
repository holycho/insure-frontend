import React, { useState } from 'react';
import { Pagination00Props } from './types';

const Pagination00: React.FC<Pagination00Props> = (props) => {
  const [paginationState, setPaginationState] = useState({ currentPage: props.initialPage ?? 1, perPageTotal: props.perPageTotal });
  const paginationItems = [...Array(Math.ceil(props.total / props.perPageTotal))].map((_, i) => i + 1);

  /**
   * @description 處理分頁切換
   * @param targetPage 目標頁
   */
  const handlePaginationToggle = (targetPage: number) => {
    setPaginationState((prevState) => ({ ...prevState, currentPage: targetPage }));
    if (props.onChange) props.onChange(targetPage, paginationState.perPageTotal);
  };

  return (
    <div className="pagination-00">
      <button
        type="button"
        className={'pagination-00__prev' + (paginationState.currentPage === paginationItems[0] ? ' pagination-00__prev--disabled' : '')}
        onClick={() => handlePaginationToggle(paginationState.currentPage - 1)}
        disabled={paginationState.currentPage === paginationItems[0]}
      />
      <div className="pagination-00__pages">
        {paginationItems.map((page) => {
          if (props.range && props.range > 0) {
            // 說明：超過顯示範圍則不顯示剩餘頁碼
            if (page >= paginationState.currentPage + props.range) {
              return null;
            }
            if (page < paginationState.currentPage && page < paginationItems.length + 1 - props.range) {
              return null;
            }
          }
          return (
            <button
              type="button"
              className={'pagination-00__page' + (page === paginationState.currentPage ? ' pagination-00__page--active' : '')}
              onClick={() => handlePaginationToggle(page)}
              key={page}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={'pagination-00__next' + (paginationState.currentPage === paginationItems[paginationItems.length - 1] ? ' pagination-00__prev--disabled' : '')}
        onClick={() => handlePaginationToggle(paginationState.currentPage + 1)}
        disabled={paginationState.currentPage === paginationItems[paginationItems.length - 1]}
      />
    </div>
  );
};

export default Pagination00;
