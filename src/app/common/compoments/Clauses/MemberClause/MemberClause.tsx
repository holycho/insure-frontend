import React, { useEffect } from 'react';
import commonService from 'app/core/services/commonService';

const MemberClause: React.FC = () => {
  useEffect(() => {
    commonService.convertChineseLi('#MemberClause');
  }, []);

  return (
    <div id="MemberClause" className="article-paragraph-00">
      <ul className="article-paragraph-00__ul article-paragraph-00__ul--null">
        <li className="article-paragraph-00__li">
          <div className="article-paragraph-00__title">
            蓮花保險網站會員條款
          </div>
          <ul className="article-paragraph-00__ul">
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您註冊會員時必須填寫確實資料，若發現有不實之登錄，蓮花保險股份有限公司(以下簡稱本公司)得暫停或終止您的會員資格。若您冒用他人名義，並若造成其他會員或本公司之損失，本公司將保留追訴權，並提供相關資料給警調單位調查。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您所登錄之基本資料如有變更時，請務必至本公司網路投保網頁更正您的資料，如因未做資料維護或更正而發生的損失，由您自行負責。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">為維護您的權益，請妥善保存您的帳號及密碼，如有遺失或被竊之慮時，請自行上網至本公司網站申請補發密碼。同時，您應嚴防個人資料、付款資料（包含信用卡資料）及會員密碼外洩。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您在本公司網站所留下之個人相關資料將被嚴密保護，您不用擔心個人資料遭受利用或侵害，有關個人隱私權聲明，請至本公司首頁點選 永恆之星 金融控股股份有限公司客戶資料保密措施閱覽。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您不得以任何方式，企圖破壞及干擾本公司網站上述各項資料與功能，且嚴禁入侵或破壞網路上任何系統之企圖或行為，否則依法追究。</div>
            </li>
            {/* 以下省略 */}
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">以下省略...</div>
            </li>
            {/* <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">本公司保留隨時更改本會員條款之權利，且將更改之內容公告於本公司網路投保網頁中，不另作會員個別通知。如您不同意更改內容，請勿繼續使用本網站服務；如您繼續使用本網站服務，即視為同意新修正之會員條款。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">非經本公司事先同意，您不得將本公司網站之任何資料進行複製、移轉、散佈或租用、出售等行為。同時必須遵守電信法及其他相關法令之規定，如有違反，本公司得依法請求賠償。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您除應遵守本條款外，亦同意遵守本公司網站各項交易規定，如未遵守，本公司保留取消您會員資格之權利。本條款之內容如有調整時，您同意遵守調整後之條款。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您因使用本服務而與本公司間所生之權利義務關係，應依中華民國法令解釋適用之，如有所爭議，以台灣台北地方法院為第一審管轄法院。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">要/被保險人已充分告知基本資料。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">要/被保險人已瞭解投保條件、投保目的及需求程度，並將交由本公司核保人員進行相關核保程序。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">要/被保險人已瞭解所交保費係用以購買保險商品。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">要/被保險人已瞭解投保之險種、保額與保費支出與其實際需求是否相當。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">要/被保險人已瞭解匯率風險之承受能力(購買以外幣收付之非投資型商品適用)。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">您同意透過蓮花保險網站https://www.lotus.com.tw/中之各項查詢機制查詢個人資料及相關投保資料。</div>
            </li>
            <li className="article-paragraph-00__li">
              <div className="article-paragraph-00__text">本公司遵守個人資料保護法令及下列消費者隱私權保護原則：</div>
              <ul className="article-paragraph-00__ul">
                <li className="article-paragraph-00__li article-paragraph-00__li--parentheses">
                  告知義務：本公司在蒐集消費者資料前，應明白告知其隱私權保護政策，包括資料蒐集之內容及其使用目的。
                </li>
                <li className="article-paragraph-00__li article-paragraph-00__li--parentheses">
                  蒐集及使用限制：資料之蒐集應經由合法及公平之方法，並應取得消費者之同意。除消費者同意或法令另有規定外，使用上不得逾原先所告知消費者之使用目的。
                </li>
                <li className="article-paragraph-00__li article-paragraph-00__li--parentheses">
                  參與：消費者得查詢及閱覽其個人資料，保險業並應提供增刪及修正機制。
                </li>
                <li className="article-paragraph-00__li article-paragraph-00__li--parentheses">
                  資料保護：對消費者之資料應依法定保存期限為妥當之保護，避免遺失或未經授權之使用、銷燬、修改、再處理或公開。個人資料已無保存必要時，應確實銷燬。
                </li>
                <li className="article-paragraph-00__li article-paragraph-00__li--parentheses">
                  責任：本公司如未能遵守上述原則或未能遵守其在隱私權保護政策中所承諾之措施時，則應負法律責任。
                </li>
              </ul>
            </li> */}
          </ul>
        </li>
      </ul>
      <br />
      <div className="article-paragraph-00__text article-paragraph-00__text--single">
        <b>上述條款僅作為作品集展示，無任何法律效力。</b>
      </div>
    </div>
  );
};

export default MemberClause;
