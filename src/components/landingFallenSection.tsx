import { Swiper, SwiperSlide } from 'swiper/react';
import { Contact } from '../routes/root';
import { prefix } from '../utils';
import { Autoplay, Navigation } from 'swiper/modules';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
export function FallenSection({ fallenArr }: { fallenArr: Contact[] }) {
  return (
    <div
      className="page-grid align-items-center flex flex-column bg-white"
      style={{
        paddingBottom: '100px',
        // background: `linear-gradient(180deg, #E7F1FB 0%, rgba(231, 241, 251, 0) 100%)`,
      }}
    >
      <h2
        className="mt-5 mb-7"
        style={{ gridArea: 'centerContent', color: 'var(--kavim-darkblue)' }}
      >
        הגיבורים שלנו
      </h2>
      <div
        className="max-w-screen px-7 gap-3 md:gap-5 justify-content-between align-items-start"
        style={{ gridArea: 'centerContent2', justifySelf: 'center' }}
      >
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          slidesPerView={'auto'}
          spaceBetween={25}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          dir="ltr"
        >
          {fallenArr &&
            fallenArr.map((fallenData, index) => (
              <SwiperSlide
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  placeContent: 'center',
                  width: 'min-content',
                  alignItems: 'center',
                }}
              >
                {fallenData.thumbnail && (
                  <img
                    src={
                      prefix +
                      fallenData.thumbnail
                        .slice(
                          0,
                          fallenData.thumbnail.indexOf('mv2') +
                            (fallenData.thumbnail.includes('jpeg') ? 8 : 7)
                        )
                        .replace('wix:image://v1/', '')
                    }
                    style={{
                      maxWidth: '200px',
                      // height: '100px',
                      backgroundColor: 'var(--kavim-blue)',
                      // borderRadius: '50%',
                    }}
                    alt={`תמונתו של ${fallenData.name}`}
                  />
                )}
                {fallenData.name}
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <Link to={'/allFallen'}>
        <Button
          className="align-items-center mt-7 form-button"
          label="לכל הגיבורים"
          pt={{
            label: {
              style: { fontWeight: '500', color: 'var(--kavim-darkblue)' },
            },
          }}
        />
      </Link>
    </div>
  );
}
