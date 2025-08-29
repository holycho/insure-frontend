import React from 'react';
// 說明：客製需求，非視覺團隊提供的樣式，故加在此處
const styles: { [key: string]: React.CSSProperties } = {
  remark: {
    wordBreak: 'break-all',
    textAlign: 'justify'
  }
};
const PersonalNoticeClause: React.FC = () => (
  <div className="article-paragraph-00">
    <div className="article-paragraph-00__text article-paragraph-00__text--single">
      親愛的客戶，您好：<br />蓮花保險股份有限公司(以下稱本公司)依據個人資料保護法（以下稱個資法）第六條第二項、第八條第一項（如為間接蒐集之個人資料則為第九條第一項）規定，向台端告知下列事項，請台端詳閱：
    </div>
    <ul className="article-paragraph-00__ul article-paragraph-00__ul--null">
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">蒐集之目的：</div>
        <ul className="article-paragraph-00__ul">
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">財產保險 (Ｏ九三)</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">人身保險 (ＯＯ一)</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">行銷（包含金控共同行銷業務）(○四○)</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">其他經營合於營業登記項目或組織章程所定之業務 (一八一)</div>
          </li>
        </ul>
      </li>
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">蒐集之個人資料類別：</div>
        <div className="article-paragraph-00__text">姓名、身分證統一編號/護照號碼、聯絡方式、病歷、醫療、健康檢查、職業、保險資料等，詳如相關業務申請書或契約書內容。</div>
      </li>
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">個人資料之來源(個人資料非由當事人提供，而為間接蒐集之情形適用)：</div>
        <ul className="article-paragraph-00__ul">
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">要保人/被保險人</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">司法警憲機關、委託協助處理理賠之公證人或機構</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">當事人之法定代理人、輔助人</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">各醫療院所</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">與第三人共同行銷、交互運用客戶資料、合作推廣等關係、或於本公司各項業務內所委託往來之第三人</div>
          </li>
        </ul>
      </li>
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">個人資料利用之期間、對象、地區、方式：</div>
        <ul className="article-paragraph-00__ul">
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">期間：因執行業務所必須及依法令規定應為保存之期間。</div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">
              對象：本(分)公司及本公司海外分支機構、本公司所屬 永恆之星 金融控股股份有限公司、
              中華民國產物保險商業同業公會、中華民國人壽保險商業同業公會、財團法人
              保險事業發展中心、財團法人保險安定基金、財團法人住宅地震保險基金、財
              團法人汽車交通事故特別補償基金、財團法人金融消費評議中心、財團法人金
              融聯合徵信中心、財團法人聯合信用卡中心、台灣票據交換所、財金資訊公司、
              關貿網路股份有限公司、中央健康保險局、業務委外機構、與本公司有再保業
              務往來之公司、依法有調查權機關或金融監理機關。
            </div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">
              地區：上述對象所在之地區。
            </div>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">
              方式：合於法令規定之利用方式。
            </div>
          </li>
        </ul>
      </li>
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">依據個資法第三條規定，台端就本公司保有台端之個人資料得行使之權利及方式：</div>
        <ul className="article-paragraph-00__ul">
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">得向本公司行使之權利：</div>
            <ul className="article-paragraph-00__ul article-paragraph-00__ul--nested">
              <li className="article-paragraph-00__li">
                <div className="article-paragraph-00__text">向本公司查詢、請求閱覽或請求製給複製本。</div>
              </li>
              <li className="article-paragraph-00__li">
                <div className="article-paragraph-00__text">向本公司請求補充或更正。</div>
              </li>
              <li className="article-paragraph-00__li">
                <div className="article-paragraph-00__text">向本公司請求停止蒐集、處理或利用及請求刪除。</div>
              </li>
            </ul>
          </li>
          <li className="article-paragraph-00__li article-paragraph-00__li--parentheses-chinese">
            <div className="article-paragraph-00__text">行使權利之方式：依本公司官網之「蓮花保險股份有限公司當事人依個人資料保護法行使權利申請書」行使之。</div>
          </li>
        </ul>
      </li>
      <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
        <div className="article-paragraph-00__title">台端不提供個人資料所致權益之影響（個人資料由當事人直接提供，而為直接蒐集之情形適用）：</div>
        <div className="article-paragraph-00__text">台端若未能提供相關個人資料時，本公司將可能延後或無法進行必要之審核及處理作業，因此可能婉拒承保、遲延或無法提供台端相關服務或給付。</div>
      </li>
    </ul>
    <div className="article-paragraph-00__text article-paragraph-00__text--single" style={styles.remark}>
      【註】：上開告知事項已公告於本公司官網（https://www.cki.com.tw/home/privacy），如有任何問題歡迎洽詢本公司0800-xxx-xxx免付費專線。
    </div>
    <br />
    <div className="article-paragraph-00__text article-paragraph-00__text--single">
      V1.1
    </div>
  </div>
);

export default PersonalNoticeClause;
