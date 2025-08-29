import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import Input00 from 'app/common/compoments/Element/Input/Input00';
import Select02 from 'app/common/compoments/Element/Select/Select02';
import DatePicker00 from 'app/common/compoments/Element/DatePicker/DatePicker00';
import commonService from 'app/core/services/commonService';
import { RightOutlined } from '@ant-design/icons';

const areaOptions = [
  {
    id: '',
    text: '單位'
  },
  {
    id: 'P',
    text: '坪'
  },
  {
    id: 'M2',
    text: '平方公尺'
  }
];

const materialOptions = [
  {
    id: '',
    text: '請選擇構造'
  },
  {
    id: '1',
    text: '鋼骨混擬土(水泥)造'
  },
  {
    id: '2',
    text: '鋼骨鋼筋混擬土(水泥)造'
  },
  {
    id: '3',
    text: '鋼筋混擬土(水泥)造'
  }
];

const rootOptions = [
  {
    id: '',
    text: '屋頂'
  },
  {
    id: '1',
    text: '水泥平頂屋'
  },
  {
    id: '2',
    text: '橡膠屋頂'
  },
  {
    id: '3',
    text: '金屬屋頂'
  }
];

const cityOptions = [
  {
    id: '',
    text: '請輸入'
  },
  {
    id: '1',
    text: '基隆市'
  },
  {
    id: '2',
    text: '台北市'
  },
  {
    id: '3',
    text: '新北市'
  }
];

const costOptions = [
  {
    id: '',
    text: '請輸入'
  },
  {
    id: '1',
    text: '0萬'
  },
  {
    id: '2',
    text: '1萬'
  },
  {
    id: '3',
    text: '2萬'
  }
];

const Choose: React.FC = () => {
  const routerHistory = useHistory();

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CALCULATION);
  };

  const handleNextClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO);
  };

  return (
    <div className="inside-page-01-layout__latter">
      <div className="result-layout-00__block">
        <div className="inside-page-01-layout__form form-layout-00">
          <div className="form-layout-00__title">
            建物及權狀資料
          </div>
          <div className="form-layout-00__body">
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">使用面積</div>
              <div className="form-layout-00__row form-layout-00__row--wrap">
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Input00 placeholder="請輸入" />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Select02 options={areaOptions} />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">建築樓高</div>
              <div className="form-layout-00__row form-layout-00__row--wrap">
                <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                  <div className="form-layout-00__row ">
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">
                        地上自一樓起共
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                      <Input00 placeholder="請輸入" />
                      <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">
                        層
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--pushed form-layout-00__cell--align-self-center">
                  <div className="checkbox-01">
                    <input type="checkbox" id="cus-checkbox01" name="checkbox-group-01" />
                    <label htmlFor="cus-checkbox01">
                      <span></span>
                      <div className="text">同棟建築物有營業行為</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">建築構造</div>
              <div className="form-layout-00__row form-layout-00__row--wrap">
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Select02 options={materialOptions} />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Select02 options={rootOptions} />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">所在地區</div>
              <div className="form-layout-00__row form-layout-00__row--wrap">
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Select02 options={cityOptions} />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">裝潢成本</div>
              <div className="form-layout-00__row">
                <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                  <div className="form-layout-00__head-tag">每坪</div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                  <Select02 options={costOptions} />
                  <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                  <div className="form-layout-00__head-tag">元</div>
                </div>
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">保險期間</div>
              <div className="form-layout-00__row form-layout-00__row--wrap">
                <div className="form-layout-00__cell form-layout-00__cell--auto">
                  <div className="form-layout-00__row">
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__head-tag">
                        自 民國
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                      <DatePicker00 placeholder="年/月/日" id="effDate" />
                      <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
                    </div>
                  </div>
                </div>
                <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--mobile-full form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                  <div className="form-layout-00__head-tag">
                    中午12時起 保期1年
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inside-page-01-layout__form form-layout-00">
          <div className="form-layout-00__title">
            試算您要投保的保險金額
          </div>
          <div className="form-layout-00__body">
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">住宅火災保險</div>
              <div className="form-layout-00__row ">
                <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-response">
                  <div className="form-layout-00__row form-layout-00__row--wrap">
                    <div className="form-layout-00__cell form-layout-00__cell--auto">
                      <div className="form-layout-00__row">
                        <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                          <div className="form-layout-00__head-tag">
                            建築物保險金額
                          </div>
                        </div>
                        <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
                          <Input00 placeholder="請輸入" />
                        </div>
                        <div className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--align-self-center">
                          <div className="form-layout-00__head-tag">
                            萬元
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--align-self-center form-layout-00__cell--auto form-layout-00__cell--no-shrink">
                      <div className="form-layout-00__row form-layout-00__row--spare form-layout-00__row--align-center ">
                        <div className="form-layout-00__head-tag">
                          （包含裝潢成本）
                        </div>
                        <div className="text-collection">
                          <a className="text-collection__with-right-arrow text-collection__with-right-arrow__a" href="#">
                            建議保額
                            <RightOutlined style={{ fontSize: 16, color: '#EF4F4F' }} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
              <div className="form-layout-00__row form-layout-00__row--no-flex form-layout-00__row--smaller-gap">
                <div className="form-layout-00__cell form-layout-00__cell--auto">
                  <div className="checkbox-01  checkbox-01--wrap-full">
                    <input type="checkbox" id="cus-checkbox01" name="checkbox-group-01" />
                    <label htmlFor="cus-checkbox01">
                      <span></span>
                      <div className="text">加保建築物內動產保險金額</div>
                    </label>
                    <div className="checkbox-01__extension checkbox-01__extension--flex">
                      <div className="checkbox-01__extension-cell">
                        <div className="input-00">
                          <input type="text" />
                        </div>
                      </div>
                      <div className="checkbox-01__extension-cell checkbox-01__extension-cell-shrink">
                        萬元
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
              <div className="form-layout-00__hint-tag form-layout-00__hint-tag--mt20 hint-tag">
                本保險契約於承保被保險人所有建築物之後，即自動承保其所有置存建築物內動產，其保險金額之約定以實際現金價值為基礎，並為建築物保險金額之30%，但最高以新臺幣80萬元為限，被保險人對前述動產之保險金額不足時，可另行投保其不足之部份。
              </div>
            </div>
            <div className="form-layout-00__section">
              <div className="form-layout-00__title-tag">住宅火災保險</div>
              <div className="form-layout-00__row ">
                <div className="form-layout-00__cell form-layout-00__cell--full form-layout-00__cell--mobile-response">
                  <div className="form-layout-00__value-text">
                    採全國單一費率，每年保費新臺幣1,350元（每一戶按保額新臺幣一百五十萬元計算，保額低於一百五十萬元者，按比例計算保費）。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inside-page-01-layout__form form-layout-00">
          <div className="form-layout-00__title">
            選擇方案
          </div>
          <div className="form-layout-00__body">
            <div className="form-layout-00__row form-layout-00__row--f-wrap">
              <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">保險期間</div>
                  <div className="form-layout-00__value-text">110年03月31日中午12時 起1年</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="result-layout-00__block">
        <div className="result-layout-00__label-text">選擇您需要的投保方案</div>
        <div className="form-layout-01">
          <div className="form-layout-01__group">
            <div className="form-layout-01__cell form-layout-01-cell form-layout-01-cell--bordered">
              <div className="form-layout-01-cell__tag form-layout-01-cell-tag">
                <div className="form-layout-01-cell-tag__head">
                  <div className="form-layout-01-cell-tag__title">保費</div>
                </div>
                <div className="form-layout-01-cell-tag__content">
                  <div
                    className="form-layout-01-cell-tag__prefixed-tag form-layout-01-cell-tag__prefixed-tag--denied"
                    data-prefix="NT$">301</div>
                  <div className="form-layout-01-cell-tag__arrow"></div>
                  <div className="form-layout-01-cell-tag__prefixed-tag" data-prefix="NT$">0</div>
                </div>
              </div>
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row  form-layout-01-cell__morph-row--align-center">
                  <div className="radio-group-00-item radio-group-00-item--bold  radio-group-00-item--fluid radio-group-00-item--m-basis-175 radio-group-00-item--align-start">
                    <input type="radio" id="cus-radio01399" name="radio-group-03" className="radio-group-00-item__input" checked />
                    <label htmlFor="cus-radio01399" className="radio-group-00-item__label">
                      <span className="radio-group-00-item__icon"></span>
                      <div className="radio-group-00-item__text text" data-tooltip-trigger="tooltip-01">住宅火災保險
                      </div>
                      <div className="radio-group-00-item__tag color-tag  color-tag--green color-tag--no-width">
                        <div className="color-tag__text">住宅火災保險（基本型）</div>
                      </div>
                    </label>
                    <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">319</div>
                  </div>
                </div>
                <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
              </div>
              <div className="form-layout-01-cell__content">
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅第三人責任基本保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅玻璃保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅颱風及洪水災害補償保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
                  <div className="form-layout-01-cell__mimic-title form-layout-01-cell__mimic-title--bold"
                    data-tooltip-trigger="tooltip-01">住宅地震基本保險
                  </div>
                  <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">319</div>
                </div>
              </div>
              <div className="form-layout-01-cell__content">
                <div
                  className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅第三人責任基本保險
                    </div>
                  </div>
                  <div className="space-between__latter">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-layout-01__group">
            <div className="form-layout-01__cell form-layout-01-cell form-layout-01-cell--bordered">
              <div className="form-layout-01-cell__tag form-layout-01-cell-tag">
                <div className="form-layout-01-cell-tag__head">
                  <div className="form-layout-01-cell-tag__title">保費</div>
                </div>
                <div className="form-layout-01-cell-tag__content">
                  <div className="form-layout-01-cell-tag__prefixed-tag form-layout-01-cell-tag__prefixed-tag--denied" data-prefix="NT$">301</div>
                  <div className="form-layout-01-cell-tag__arrow"></div>
                  <div className="form-layout-01-cell-tag__prefixed-tag" data-prefix="NT$">0</div>
                </div>
              </div>
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
                  <div className="radio-group-00-item radio-group-00-item--bold radio-group-00-item--m-basis-175 radio-group-00-item--fluid radio-group-00-item--align-start">
                    <input type="radio" id="cus-radio013999" name="radio-group-03" className="radio-group-00-item__input" checked />
                    <label htmlFor="cus-radio013999" className="radio-group-00-item__label">
                      <span className="radio-group-00-item__icon"></span>
                      <div className="radio-group-00-item__text text" data-tooltip-trigger="tooltip-01">住宅綜合保險
                      </div>
                      <div className="radio-group-00-item__tag color-tag  color-tag--green color-tag--no-width">
                        <div className="color-tag__text">住宅綜合保險（進階型）</div>
                      </div>
                    </label>
                    <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">319</div>
                  </div>
                </div>
                <div className="form-layout-00__error-tag error-tag">錯誤訊息</div>
              </div>
              <div className="form-layout-01-cell__content">
                <div
                  className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      訪客及第三人責任基本保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      財物損害保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅玻璃保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
                <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅颱風及洪水災害補償保險
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
                  <div className="form-layout-01-cell__mimic-title form-layout-01-cell__mimic-title--bold"
                    data-tooltip-trigger="tooltip-01">住宅地震基本保險
                  </div>
                  <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">1350</div>
                </div>
              </div>
              <div className="form-layout-01-cell__content">
                <div
                  className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      住宅第三人責任基本保險
                    </div>
                  </div>
                  <div className="space-between__latter">
                    <div className="form-layout-01-cell__text">
                      建築物（含裝潢）948萬，建築物內動產0萬
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
        <button className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
          返回上一步
        </button>
        <button className="inside-page-01-layout__btn btn-primary" onClick={handleNextClick}>
          下一步
        </button>
      </div>
    </div>
  );
};

export default Choose;
