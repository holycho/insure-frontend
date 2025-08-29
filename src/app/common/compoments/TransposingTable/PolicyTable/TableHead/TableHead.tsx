import React from 'react';
import { IProps } from './types';

const TableHead: React.FC<IProps> = (props) => {
  return (
    <thead className="transposing-table-00-pc__thead">
      <tr className="transposing-table-00-pc__tr">
        {props.columns.map((it, index) => (
          <td key={`${props.prefix}-${index}`} className="transposing-table-00-pc__td">
            <div className="transposing-table-00-pc__text transposing-table-00-pc__text--bold">
              {it}
            </div>
          </td>
        ))}
        {/* 按鈕 */}
        <td className="transposing-table-00-pc__td" />
      </tr>
    </thead>
  );
};

export default TableHead;
