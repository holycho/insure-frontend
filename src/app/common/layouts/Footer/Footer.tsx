import commonService from 'app/core/services/commonService';
import React, { useEffect, useRef, useState } from 'react';
import { DownCircleFilled } from '@ant-design/icons';
import $ from 'jquery';

const Footer: React.FC = () => {
  const [mobileId, setMobileId] = useState<string>('mobile-01');
  const originId = useRef<string>('');

  useEffect(() => {
    console.log(originId.current, mobileId);
    if (originId.current) {
      $(`#${originId.current}`).slideUp(500);
    }
    $(`#${mobileId}`).slideDown(500);
  }, [mobileId]);

  const handleItemCollapse = async (selectId: string) => {
    originId.current = mobileId; // 緩存上一次點擊
    setMobileId(selectId);
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* foot former */}
        <div className="footer__former">
          <div data-testid="contact" className="footer-contact">
            <div className="footer-contact__title">聯絡訊息</div>
            <div className="footer-contact__content">
              <div className="footer-contact__former">
                <div className="footer-contact__text">地址：114 台北市內湖區瑞光路123號</div>
                <div className="footer-contact__text">免費申訴電話：0800-xxx-xxx</div>
                <div className="footer-contact__text">客服專線：0800-xxx-xxx</div>
                <div className="footer-contact__text">專人服務時間：週一 ~ 週五 9：00 ~ 18：00</div>
                <div className="footer-contact__text">
                  客服信箱：
                  <a href="#" className="footer-contact__link">insure.help@mail.lotus.com.tw</a>
                </div>
                <div className="footer-contact__text">傳真：(02) oooo-xxxx、(02) xxxx-oooo
                </div>
              </div>
              <div className="footer-contact__latter">
                <div className="footer-contact__text">投保服務專線：(02)oxox-oxox</div>
                <div className="footer-contact__text">汽車保險：分機 0001</div>
                <div className="footer-contact__text">機車保險：分機 0002</div>
                <div className="footer-contact__text">住火險：分機 0003</div>
                <div className="footer-contact__text">旅平險：分機 0004</div>
                <div className="footer-contact__text">個傷險：分機 0005</div>
              </div>
            </div>
          </div>
        </div>
        {/* foot latter */}
        <div className="footer__latter">
          <div className="footer-links">
            <div className="footer-links__pc">
              <div className="footer-links__column">
                <img className="bg" src={commonService.getImageUrl('rose.jpg')} />
                <div data-testid="service" className="footer-links__group footer-links-group">
                  <div className="footer-links-group__title">保戶服務</div>
                  <div className="footer-links-group__list">
                    <a href="#" className="footer-links__item">身心障礙投保諮詢</a>
                    <a href="#" className="footer-links__item">續保到府服務</a>
                    <a href="#" className="footer-links__item">理賠專人服務</a>
                    <a href="#" className="footer-links__item">緊急救助關懷</a>
                  </div>
                </div>
              </div>
              <div className="footer-links__column">
                <img className="bg" src={commonService.getImageUrl('lotus.jpg')} />
                <div data-testid="terms" className="footer-links__group footer-links-group">
                  <div className="footer-links-group__title">條款政策</div>
                  <div className="footer-links-group__list">
                    <a href="#" className="footer-links__item">隱私權安全聲明</a>
                    <a href="#" className="footer-links__item">個人資料隱私權保護政策</a>
                  </div>
                </div>
              </div>
              <div className="footer-links__column">
                <img className="bg" src={commonService.getImageUrl('cherry-blossoms.jpg')} />
                <div data-testid="links" className="footer-links__group footer-links-group">
                  <div className="footer-links-group__title">相關連結</div>
                  <div className="footer-links-group__list">
                    <a href="#" className="footer-links__item">保險業經營電子商務自律規範</a>
                    <a href="#" className="footer-links__item">金融監督管理委員會</a>
                    <a href="#" className="footer-links__item">蓮花公開資訊</a>
                  </div>
                </div>
              </div>
              <div className="footer-links__column">
                <img className="bg" src={commonService.getImageUrl('hyacinth.jpg')} />
                <div data-testid="group" className="footer-links__group footer-links-group">
                  <div className="footer-links-group__title">永恆之星金控集團</div>
                  <div className="footer-links-group__list">
                    <a href="#" className="footer-links__item">玫瑰金控</a>
                    <a href="#" className="footer-links__item">百合銀行</a>
                    <a href="#" className="footer-links__item">蓮花保險</a>
                    <a href="#" className="footer-links__item">芍藥資產</a>
                  </div>
                </div>
              </div>
            </div>
            {/* 手機版 */}
            <div style={{ position: 'relative', margin: '10px 0px' }} className="footer-links__mobile">
              <div style={{ pointerEvents: 'none', backgroundImage: `url(${commonService.getImageUrl('mobile-flowers.jpg')})`, backgroundSize: 'cover', opacity: 0.1, position: 'absolute', width: '100%', height: '100%' }}></div>
              <div className="footer-links__group footer-links-group">
                <div style={{ cursor: 'pointer' }} onClick={() => handleItemCollapse('mobile-01')} className="footer-links-group__title">
                  <span>保戶服務</span>
                  <DownCircleFilled style={{ margin: '0px 20px', fontSize: 20, position: 'absolute', right: 0, color: '#EF4F4F', lineHeight: 28 }} />
                </div>
                <div id="mobile-01" className="footer-links-group__list">
                  <a href="#" className="footer-links__item">身心障礙投保諮詢</a>
                  <a href="#" className="footer-links__item">續保到府服務</a>
                  <a href="#" className="footer-links__item">理賠專人服務</a>
                  <a href="#" className="footer-links__item">緊急救助關懷</a>
                </div>
              </div>
              <div className="footer-links__group footer-links-group">
                <div style={{ cursor: 'pointer' }} onClick={() => handleItemCollapse('mobile-02')} className="footer-links-group__title">
                  <span>條款政策</span>
                  <DownCircleFilled style={{ margin: '0px 20px', fontSize: 20, position: 'absolute', right: 0, color: '#EF4F4F', lineHeight: 28 }} />
                </div>
                <div id="mobile-02" className="footer-links-group__list">
                  <a href="#" className="footer-links__item">隱私權安全聲明</a>
                  <a href="#" className="footer-links__item">個人資料隱私權保護政策</a>
                </div>
              </div>
              <div className="footer-links__group footer-links-group">
                <div style={{ cursor: 'pointer' }} onClick={() => handleItemCollapse('mobile-03')} className="footer-links-group__title">
                  <span>相關連結</span>
                  <DownCircleFilled style={{ margin: '0px 20px', fontSize: 20, position: 'absolute', right: 0, color: '#EF4F4F', lineHeight: 28 }} />
                </div>
                <div id="mobile-03" className="footer-links-group__list">
                  <a href="#" className="footer-links__item">保險業經營電子商務自律規範</a>
                  <a href="#" className="footer-links__item">金融監督管理委員會</a>
                  <a href="#" className="footer-links__item">蓮花公開資訊</a>
                </div>
              </div>
              <div className="footer-links__group footer-links-group">
                <div style={{ cursor: 'pointer' }} onClick={() => handleItemCollapse('mobile-04')} className="footer-links-group__title">
                  <span>永恆之星金控集團</span>
                  <DownCircleFilled style={{ margin: '0px 20px', fontSize: 20, position: 'absolute', right: 0, color: '#EF4F4F', lineHeight: 28 }} />
                </div>
                <div id="mobile-04" className="footer-links-group__list">
                  <a href="#" className="footer-links__item">玫瑰金控</a>
                  <a href="#" className="footer-links__item">百合銀行</a>
                  <a href="#" className="footer-links__item">蓮花保險</a>
                  <a href="#" className="footer-links__item">芍藥資產</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__foot footer-foot">
        <div className="footer-foot__inner">
          <div className="footer-foot__latter">
            <div className="footer-foot__support">
              <div className="footer-foot__copyright">Copyright© 2025 LOTUS INSURANCE All Right Reserved</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
