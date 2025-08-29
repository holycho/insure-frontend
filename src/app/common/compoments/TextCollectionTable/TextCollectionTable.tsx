import React from 'react';
import { TextCollectionTableProps } from './types';

const TextCollectionTable: React.FC<TextCollectionTableProps> = (props) => {
  return (
    <>
      <div className="text-collection__title">{props.title}</div>
      <div className="basic-table-container margin-top-8 padding-bottom-40 custom-width-1">
        <table className="basic-table-container__table">
          <thead>
            <tr>
              {props.head.map((col, colIdx) => {
                const headKey = `${props.id}-header`;
                let clsName = '';
                if (colIdx === 0) clsName = 'has-border-top-left-radious';
                if (colIdx === props.head.length - 1) clsName = 'has-border-top-right-radious';
                return (
                  <th key={`${headKey}-col-${colIdx}`} className={clsName}>{col}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {/* 抽獎活動 */}
            {props.awards.length > 0 && props.awards.map((award, index) => {
              const rowKey = `${props.id}-row-${index}`;
              return (
                <tr key={rowKey}>
                  {award.cols.map((col, colIdx) => {
                    return (
                      <td key={`${rowKey}-col-${colIdx}`} className="border-bottom">{col.colValue}</td>
                    );
                  })}
                </tr>
              );
            })}
            {/* 中獎名單 */}
            {props.winners.length > 0 && props.winners.map((winner, index) => {
              return (
                <tr key={`${props.id}-row-${index}`}>
                  <td className="border-bottom">{winner.award}</td>
                  <td className="border-bottom">{winner.prize}</td>
                  <td className="border-bottom">{winner.winnerName}</td>
                  <td className="border-bottom">{winner.policyNo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TextCollectionTable;
