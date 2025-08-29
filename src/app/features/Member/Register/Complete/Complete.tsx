import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import { RootState } from 'app/store/types';
import { initRegisterCompleteAction } from 'app/store/member/register/actions';
import commonService from 'app/core/services/commonService';
import { SigninResp } from 'app/bff/models/signin';
import { resetLoginCacheAction } from 'app/store/member/login/actions';
import storageService from 'app/core/services/storageService';
import { StorageKeysEnum } from 'app/core/enum/storage';
import { setMemberAuthorizationAction } from 'app/store/system/actions';
import apiService from 'app/bff/services/apiService';

const Complete: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const registerState = useSelector((state: RootState) => state.member.register);

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    reduxDispatch(initRegisterCompleteAction());

  }, [reduxDispatch]);

  /**
   * @description 執行登入
   */
  useEffect(() => {
    // 重置登入資料緩存
    reduxDispatch(resetLoginCacheAction());
    // 根據會員註冊結果更新登入資訊
    if (registerState.complete && registerState.complete.result) {
      const memInfo: SigninResp = {
        member: {
          sn: registerState.complete.result.memSn,
          name: registerState.complete.memName ?? ''
        },
        token: registerState.complete.result.token
      };
      // 緩存「會員主檔」和「Access Token」至 browser storage
      storageService.setItem(StorageKeysEnum.Authorization, JSON.stringify(memInfo));
      // 緩存「會員主檔」和「Access Token」至 store (global)
      reduxDispatch(setMemberAuthorizationAction(memInfo));
    }
  }, [reduxDispatch, registerState.complete]);

  /**
   * @description 開啟分享推薦碼 Dialog
   */
  const handleOpenReferralDialog = () => {

  };

  /**
   * @description 返回原頁
   */
  const handleRedirectToOriginalPage = () => {

  };

  /**
   * @description 處理導頁
   */
  const handleRedirect = (linkUrl: string) => {
    if (!linkUrl) return;
    window.open(encodeURI(linkUrl), '_blank');
  };

  return (
    <>
      <div className="inside-page-01-banner inside-page-01-banner--result">
        <div className="inside-page-01-banner__inner">
          <div className="inside-page-01-banner__former inside-page-01-banner__former--center">
            <div className="inside-page-01-banner__title inside-page-01-banner__title--main">恭喜你完成會員註冊</div>
            <div className="inside-page-01-banner__title inside-page-01-banner__title--vice">我們將發送註冊完成通知至您的手機與電子信箱</div>
          </div>
        </div>
      </div>
      <div className="inside-page-01-layout__latter inside-page-01-layout__latter--result">
        <div className="result-layout-00">
          {registerState.complete.result && (
            <div className="result-layout-00__head">
              <div className="share-block-00">
                <div className="share-block-00__former">
                  <div className="share-block-00__title">
                    <div className="share-block-00__text">分享我的推薦碼</div>
                    <button type="button" className="share-block-00__text share-block-00__text--highlight" onClick={handleOpenReferralDialog}>
                      {registerState.complete.result.privateInviteCode}
                    </button>
                  </div>
                  <div className="share-block-00__descrp">分享推薦碼給好友，即可享有網路投保專屬優惠！</div>
                </div>
                <div className="share-block-00__latter">
                  <div className="share-block-00__social-media-wrapper">
                    {/* <CopyButton copyContent={registerState.complete.result.privateInviteCode} copyDoneMessage={`成功複製推薦碼：${registerState.complete.invite.privateInviteCode}`} /> */}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="result-layout-00__content">
            {registerState.complete.topsale && (
              <div className="result-layout-00__block">
                <div className="result-layout-00__label-text">也許你需要這些保障</div>
                <div className="card-collection-05">
                  {registerState.complete.topsale.map((it, index) => (
                    <div key={`topsale-${index}`} className="card-collection-05__item">
                      <div className="photo-card-03">
                        <div className="photo-card-03__bg">
                          <img src={commonService.getImageUrl(it.imgRectangleName)} className="img" />
                        </div>
                        <div className="photo-card-03__inner">
                          <div className="photo-card-03__title">{it.prodName}</div>
                          <div className="photo-card-03__descrp">{it.prodIntro}</div>
                          <div className="photo-card-03__btn btn-primary" onClick={() => handleRedirect(it.linkUrl)}>了解保障</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-center-wrapper">
          <Link to={ROUTES.HOME__MAIN} className="inside-page-01-layout__btn btn-primary">
            返回網路投保首頁
          </Link>
          {/* <button style={{ margin: '10px 50px' }} type="button" className="btn-text" onClick={handleRedirectToOriginalPage}>
            返回原頁
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Complete;