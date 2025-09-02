import commonService from 'app/core/services/commonService';
import React, { useEffect } from 'react';

const PaymentTransferNotice: React.FC = () => {
  useEffect(() => {
    commonService.convertChineseLi('#PaymentTransferNotice');
  }, []);

  return (
    <div id="PaymentTransferNotice" className="article-paragraph-00">
      <div className="article-paragraph-00__text article-paragraph-00__text--single">
        「全國繳費網」係提供即時自您的轉出帳戶繳付多張帳單之代收費用服務平台(以下稱本服務)。為了保障您的權益，請於使用本服務前，詳細閱讀下列注意事項，若您對本服務尚有不瞭解或不同意注意事項之內容者，請勿執行相關交易。
      </div>
      <ul className="article-paragraph-00__ul article-paragraph-00__ul--null">
        <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
          <div className="article-paragraph-00__title">資料蒐集</div>
          <div className="article-paragraph-00__text">
            您使用本服務所輸入之相關資料，將由本公司、帳務代理、轉出、轉入金融機構及財金資訊股份有限公司在完成上述服務之特定目的內，蒐集、處理、利用及國際傳輸您的個人資料。
          </div>
        </li>
        <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
          <div className="article-paragraph-00__title">繳費限額</div>
          <div className="article-paragraph-00__text">
            本服務繳付限額，每一轉出帳戶每日不得超過新臺幣(下同)10萬元，每月不得超過20萬元。如轉出金融機構之限額低於前述規定，則依轉出金融機構之規定辦理。
          </div>
        </li>
        <li className="article-paragraph-00__li article-paragraph-00__li--chinese-bold">
          <div className="article-paragraph-00__title">交易糾紛</div>
          <div className="article-paragraph-00__text">
            您使用本服務倘有錯誤或對款項之計算暨退補費等發生疑義，應洽本公司或轉出金融機構處理。
          </div>
        </li>
      </ul>
      <br />
      <div className="article-paragraph-00__text article-paragraph-00__text--single">
        <b>上述條款僅作為作品集展示，無任何法律效力。</b>
      </div>
    </div>
  );
};

export default PaymentTransferNotice;
