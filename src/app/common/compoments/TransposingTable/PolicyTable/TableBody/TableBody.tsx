import React from 'react';
import { useDispatch } from 'react-redux';
import { ButtonInfo } from 'app/bff/models/service/policyList';
import { IProps } from './types';
import { YesNoCodesEnum } from 'app/core/enum/yesNo';
import { fetchPolicyDetailAction } from 'app/store/service/queryPolicy/actions';

const TableBody: React.FC<IProps> = (props) => {
  const reduxDispatch = useDispatch();

  const renderButton = (btnInfo: ButtonInfo, key: string) => {
    // console.log('按鈕', btnInfo);
    const buttons: JSX.Element[] = [];
    if (btnInfo.showPolicyModify === YesNoCodesEnum.Yes) {
      buttons.push(<button key={`${key}-modifyPolicy`} className="transposing-table-00-pc__btn btn-primary">{'保期修改'}</button>);
    }
    if (btnInfo.showUploadPhoto === YesNoCodesEnum.Yes) {
      buttons.push(<button key={`${key}-uploadPhoto`} className="transposing-table-00-pc__btn btn-primary">{'補傳照片'}</button>);
    }
    if (btnInfo.showRefund === YesNoCodesEnum.Yes) {
      buttons.push(<button key={`${key}-refund`} className="transposing-table-00-pc__btn btn-primary">{'申請退費'}</button>);
    }
    return (
      <>
        {buttons}
      </>
    );
  };

  const handleRedirect = (applyNo: string) => {
    if (!props.planType) return;
    switch (props.planType) {
      case 'fire': {
        reduxDispatch(fetchPolicyDetailAction(props.planType, applyNo, props.id));
        break;
      }
      default:
        break;
    }
  };

  return (
    <tbody className="transposing-table-00-pc_tbody">
      {props.list.map((it, index) => {
        return (
          <tr key={`${props.prefix}-row-${index}`} className="transposing-table-00-pc__tr">
            <td key={`${props.prefix}-row-${index}-col1`} className="transposing-table-00-pc__td">
              <div style={{ cursor: 'pointer' }} className="transposing-table-00-pc__link" onClick={() => handleRedirect(it.applyNo)}>
                {it.applyNo}
              </div>
            </td>
            <td key={`${props.prefix}-row-${index}-col2`} className="transposing-table-00-pc__td">
              {/* 強制險 */}
              {(props.planType === 'car' || props.planType === 'moto') && it.startTime && it.endTime && (
                <div className="transposing-table-00-pc__tags transposing-table-00-pc__tags--align-center">
                  <div className="transposing-table-00-pc__tag color-tag color-tag--green">
                    <div className="color-tag__text">強制險</div>
                  </div>
                  <div className="transposing-table-00-pc__text">
                    <div>{it.startTime}</div>
                    <div>&nbsp;~&nbsp;</div>
                    <div>{it.endTime}</div>
                  </div>
                </div>
              )}
              {/* 任意險 */}
              {(props.planType === 'car' || props.planType === 'moto') && it.vStartTime && it.vEndTime && (
                <div className="transposing-table-00-pc__tags transposing-table-00-pc__tags--align-center">
                  <div className="transposing-table-00-pc__tag color-tag color-tag--green">
                    <div className="color-tag__text">任意險</div>
                  </div>
                  <div className="transposing-table-00-pc__text">
                    <div>{it.vStartTime}</div>
                    <div>&nbsp;~&nbsp;</div>
                    <div>{it.vEndTime}</div>
                  </div>
                </div>
              )}
              {/* 其他險 */}
              {(props.planType === 'fire' || props.planType === 'travel' || props.planType === 'pet') && (
                <div className="transposing-table-00-pc__text transposing-table-00-pc__text--no-wrap">
                  {it.startTime} ~ {it.endTime}
                </div>
              )}
            </td>
            <td key={`${props.prefix}-row-${index}-col3`} style={{ minWidth: 170 }} className="transposing-table-00-pc__td">
              {it.policyNo ? <div className="transposing-table-00-pc__text">{it.policyNo}</div> : null}
              {it.vPolicyNo ? <div className="transposing-table-00-pc__text">{it.vPolicyNo}</div> : null}
            </td>
            <td key={`${props.prefix}-row-${index}-col4`} className="transposing-table-00-pc__td">
              <div className="transposing-table-00-pc__text">{it.remark}</div>
            </td>
            <td key={`${props.prefix}-row-${index}-col5`} className="transposing-table-00-pc__td">
              {renderButton(it.buttonInfo, `${props.prefix}-row-${index}-col5`)}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
