// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { prefix } from '../utils';

export function OurActivity({ fileNameArr }: { fileNameArr: string[] }) {
  return (
    <div
      className="page-grid md:py-7 py-6"
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
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={'auto'}
          spaceBetween={25}
          loop={true}
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
      </div>
    </div>
  );
}
