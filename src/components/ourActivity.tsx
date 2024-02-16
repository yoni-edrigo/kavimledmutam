import swiperNextButton from '../assets/swipetNextButton.svg';
import swiperPreviuosButton from '../assets/swiperPreviousButton.svg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';

export function OurActivity() {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);
  return (
    <div
      className="p-5"
      style={{
        backgroundColor: '#EDF5FF',
        display: 'grid',
        gridTemplateRows: 'min-Content',
      }}
    >
      <h3>הפעילות שלנו</h3>
      <div className="relative flex w-full" style={{ justifySelf: 'center' }}>
        <img
          src={swiperPreviuosButton}
          ref={navigationNextRef}
          className="absolute top-50 right-0 w-3rem z-5"
        />
        <img
          src={swiperNextButton}
          ref={navigationPrevRef}
          className="absolute top-50 left-0 w-3rem z-5"
        />
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          dir="rtl"
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onBeforeInit={(swiper) => {
            //@ts-expect-error because
            swiper.navigation.nextEl = navigationNextRef.current;
            //@ts-expect-error because
            swiper.navigation.prevEl = navigationPrevRef.current;
          }}
          style={{
            maxHeight: '60svh !important',
          }}
        >
          <SwiperSlide className="w-10rem h-15rem bg-white">1</SwiperSlide>
          <SwiperSlide className="w-10rem h-15rem bg-white">1</SwiperSlide>
          <SwiperSlide className="w-10rem h-15rem bg-white">1</SwiperSlide>
          <SwiperSlide className="w-10rem h-15rem bg-white">1</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
