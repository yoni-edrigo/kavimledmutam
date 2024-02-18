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
      className="page-grid"
      style={{
        backgroundColor: '#EDF5FF',
        minHeight: '600px',
      }}
    >
      <h2 className="mt-5 h-2rem" style={{ gridArea: 'centerContent' }}>
        הפעילות שלנו
      </h2>
      <div
        className="align-items-center h-fit align-self-center ml-8"
        style={{ gridArea: 'centerContent' }}
      >
        <Swiper
          navigation={true}
          modules={[Navigation]}
          slidesPerView={'auto'}
          loop={true}
          spaceBetween={25}
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
                  width: '200px',
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
