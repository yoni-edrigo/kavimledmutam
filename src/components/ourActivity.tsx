// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { prefix } from '../utils';
import AnimatedOnScroll from './animate-wrapper';

export function OurActivity({ fileNameArr }: { fileNameArr: string[] }) {
  return (
    <div
      className="md:py-7 py-6"
      style={{
        backgroundColor: '#EDF5FF',
        // minHeight: '600px',
      }}
    >
      <h2
        className="h-2rem w-fit אקסא-רקעוךשר"
        style={{ gridArea: 'centerContent' }}
      >
        הפעילות שלנו
      </h2>

      <div
        className="align-items-center h-fit align-self-center ml-8 mt-7"
        style={{ gridArea: 'centerContent', maxWidth: '90vw' }}
      >
        <AnimatedOnScroll fromDirection="right">
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            slidesPerView={'auto'}
            spaceBetween={25}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            dir="ltr"
          >
            {fileNameArr.map((fileName, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: 'flex',
                  placeContent: 'center',
                  width: 'min-content',
                }}
              >
                <img
                  src={`${prefix + fileName}`}
                  style={{
                    height: '280px',
                    maxWidth: '200px',
                    objectFit: 'cover',
                  }}
                  alt="תמונה המייצגת את פעילותנו"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedOnScroll>
      </div>
    </div>
  );
}
