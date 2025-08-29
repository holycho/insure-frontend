import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import alertService from 'app/core/services/alertService';
import commonService from 'app/core/services/commonService';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { Banner } from 'app/bff/models/banner';

const IndexShowcase: React.FC = () => {
  const routerHistory = useHistory();
  const bannerState = useSelector((state: RootState) => state.home.main.banner);

  const handleTravelInsuClick = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    alertService.base('系統提醒', '投保流程建置中，敬請期待！', '確認', true, () => {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    });
  };

  const handleFireInsuClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CALCULATION);
  };

  const handleCarInsuClick = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    alertService.base('系統提醒', '投保流程建置中，敬請期待！', '確認', true, () => {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
    });
  };

  const handleRedirect = (banner: Banner) => {
    if (banner.disabled) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      alertService.base('系統提醒', banner.message, '確認', true, () => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
      });
      return;
    }
    routerHistory.push(banner.linkUrl);
  };

  return (
    <>
      <div className="index-showcase">
        <div className="index-showcase__former">
          <Swiper
            speed={800}
            // spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            pagination={{
              clickable: true,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
          >
            {bannerState.length > 0 && (
              bannerState.map((banner, index) => (
                <SwiperSlide key={`banner-${index}`}>
                  <div className="index-banner">
                    {/* <div className="index-banner__bg" style={{ backgroundImage: 'url(assets/img/bannerHome1.png)' }} /> */}
                    <div className="index-banner__bg" style={{ backgroundImage: `url(${commonService.getImageUrl(banner.imgName)})` }} />
                    <div className="index-banner__inner">
                      <div className="index-banner__title index-banner__title--main">{banner.subject}</div>
                      <div className="index-banner__title index-banner__title--vice">{banner.subtitle}</div>
                      <button className="index-banner__btn btn-primary" onClick={() => handleRedirect(banner)}>{banner.buttonText}</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
            {/* <SwiperSlide>
              <div className="index-banner">
                <div className="index-banner__bg" style={{ backgroundImage: `url(${commonService.getImageUrl('bannerHome1.png')})` }} />
                <div className="index-banner__inner">
                  <div className="index-banner__title index-banner__title--main">說走就走，安全交給我</div>
                  <div className="index-banner__title index-banner__title--vice">所有細節，完整搞定</div>
                  <button className="index-banner__btn btn-primary" onClick={handleTravelInsuClick}>了解更多</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="index-banner">
                <div className="index-banner__bg" style={{ backgroundImage: `url(${commonService.getImageUrl('bannerFire02.jpg')})` }} />
                <div className="index-banner__inner">
                  <div className="index-banner__title index-banner__title--main">住宅火災保險</div>
                  <div className="index-banner__title index-banner__title--vice">線上投保享77折優惠</div>
                  <button className="index-banner__btn btn-primary" onClick={handleFireInsuClick}>立即投保</button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="index-banner">
                <div className="index-banner__bg" style={{ backgroundImage: `url(${commonService.getImageUrl('bannerCar03.jpg')})` }} />
                <div className="index-banner__inner">
                  <div className="index-banner__title index-banner__title--main">汽車保險</div>
                  <div className="index-banner__title index-banner__title--vice">強制險優惠330元，任意險最高82折</div>
                  <button className="index-banner__btn btn-primary" onClick={handleCarInsuClick}>了解更多</button>
                </div>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default IndexShowcase;
