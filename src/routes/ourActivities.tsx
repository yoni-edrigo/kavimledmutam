import schoolCapIcon from '../assets/school-cap-icon.svg';
import helmetIcon from '../assets/helmet-icon.svg';
import schoolBanner from '../assets/school-activity-banner.jpg';
import armyBanner from '../assets/army-activity-banner.jpg';
import activityBanner from '../assets/activity-hero-banner.jpg';
import { SwiperSlide, Swiper } from 'swiper/react';
import { prefix } from '../utils';
import { Autoplay, Navigation } from 'swiper/modules';
import { useLoaderData } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { AnimatePresence, motion } from 'motion/react';
import { createPortal } from 'react-dom';

interface ActivitiesData {
  schoolActivity: string[];
  armyActivity: string[];
  abroadActivity: string[];
}

export function OurActivities() {
  const data = useLoaderData() as ActivitiesData;

  return (
    <div
      className="flex flex-column gap-7"
      style={{ minHeight: '100svh', marginBottom: '200px' }}
    >
      <ActivitiesHero />
      <AbroadActivities abroadGallery={data.abroadActivity} />
      <SchoolActivities schoolGallery={data.schoolActivity} />
      <ArmyActivities armyGallery={data.armyActivity} />
    </div>
  );
}

function ActivitiesHero() {
  return (
    <div
      className="text-center mx-auto flex flex-column sm:gap-6 gap-3 my-6 sm:my-8"
      style={{
        maxWidth: '100ch',
        width: '90svw',
      }}
    >
      <h2
        style={{
          color: 'var(--kavim-darkblue)',
        }}
      >
        הפעילות שלנו
      </h2>
      <p>
        צוות קווים לדמותם מקדם הנצחה בדרכים שונות ופועל להנצחת הנופלים בכל מקום
        צורה וזמן. על מנת שכמה שיותר יוכלו להכיר, לזכור וללמוד על הגיבורים שכבר
        אינם, אך סיפורם יחיה לעד.
      </p>
      <img src={activityBanner} className="w-full mt-3" />
    </div>
  );
}
function ArmyActivities({ armyGallery }: { armyGallery: string[] }) {
  return (
    <div
      style={{
        minHeight: '80svh',
        placeItems: 'center',
      }}
      className="max-w-screen"
    >
      <span
        className="flex flex-column align-items-center text-center mx-auto sm:my-7 my-3 sm:px-7 px-3 gap-3"
        style={{
          maxWidth: '100ch',
          width: '90svw',
        }}
      >
        <img
          src={helmetIcon}
          className="w-3rem h-3rem"
          style={{
            color: 'var(--kavim-darkblue)',
          }}
        />
        <h2
          style={{
            color: 'var(--kavim-darkblue)',
          }}
        >
          פעילות עם צה"ל
        </h2>
        <p>פעילויות משותפות עם צהל, גופים ממשלתיים ואירועי הנצחה.</p>
      </span>
      <img
        src={armyBanner}
        className="mb-7"
        style={{
          maxWidth: '100ch',
          width: '90svw',
        }}
      />
      <div
        className="mx-8"
        style={{
          maxWidth: '100ch',
          width: '90svw',
        }}
      >
        <SwiperGallery
          imageSrcArr={armyGallery.filter((f) => f.includes('wix:image://v1/'))}
        />
      </div>
    </div>
  );
}

function SchoolActivities({ schoolGallery }: { schoolGallery: string[] }) {
  return (
    <div
      className="w-screen"
      style={{
        minHeight: '70svh',

        background: `linear-gradient(0deg, #ffffff 45.26%, var(--kavim-lightblue) 100%)`,
      }}
    >
      <div
        style={{
          placeItems: 'center',
        }}
        className="max-w-screen sm:pt-7"
      >
        <span
          className="flex flex-column align-items-center text-center mx-auto my-7 px-7 gap-3"
          style={{
            maxWidth: '100ch',
            width: '90svw',
          }}
        >
          <img
            src={schoolCapIcon}
            className="w-3rem h-3rem"
            style={{
              color: 'var(--kavim-darkblue)',
            }}
          />
          <h2
            style={{
              color: 'var(--kavim-darkblue)',
            }}
          >
            פעילות בבתי ספר
          </h2>
          <p>פעילויות משותפות עם בתי ספר, מוסדות חינוך וארגונים חברתיים.</p>
        </span>
        <img
          src={schoolBanner}
          className="mb-7"
          style={{
            maxWidth: '100ch',
            width: '90svw',
          }}
        />
        <div
          className="mx-8"
          style={{
            maxWidth: '100ch',
            width: '90svw',
          }}
        >
          <SwiperGallery
            imageSrcArr={schoolGallery.filter((f) =>
              f.includes('wix:image://v1/')
            )}
          />
        </div>
      </div>
    </div>
  );
}

function AbroadActivities({ abroadGallery }: { abroadGallery: string[] }) {
  const { videoStories } = useMemo(() => {
    const videos = abroadGallery
      .filter((url) => url.includes('wix:video://v1/'))
      .map((url) => ({
        url: processVideoSrc(url),
        duration: 6000,
        type: 'video',
        styles: {
          objectFit: 'cover',
          width: '216px',
          height: '374px',
        },
        preload: 'auto',
      }));
    const images = abroadGallery.filter((url) =>
      url.includes('wix:image://v1/')
    );
    return {
      videoStories: videos,
      imageGallery: images,
    };
  }, [abroadGallery]);

  const VIDEO_WIDTH = 216;
  const VIDEO_HEIGHT = 374;

  return (
    <div style={{ minHeight: '70svh' }}>
      <span
        className="flex flex-column align-items-center text-center mx-auto mb-7 gap-3"
        style={{
          maxWidth: '100ch',
        }}
      >
        <i
          className="pi pi-globe text-3xl w-3rem h-3rem"
          style={{
            color: 'var(--kavim-darkblue)',
          }}
        />
        <h2
          style={{
            color: 'var(--kavim-darkblue)',
          }}
        >
          ברחבי העולם
        </h2>
        <p
          style={{
            maxWidth: '100ch',
            width: '90svw',
          }}
        >
          מדבקות לדמותם של הנופלים מחולקות לצעירים מסביב לעולם - שמעבירים את
          הסיפורים הלאה, מחזקים את המשפחות ומשאירים זכרונות בדמותם במקומות הכי
          יפים.
          <br />
          <br /> *כל הסרטונים שנשלחים אלינו מועברים למשפחות.
        </p>
      </span>

      <div className="mx-8">
        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          slidesPerView="auto"
          spaceBetween={25}
          loop={true}
          dir="ltr"
          centeredSlides={true}
          className="w-full"
        >
          {videoStories.map((story, index) => (
            <SwiperSlide
              key={`slide-${index}`}
              style={{
                width: `${VIDEO_WIDTH}px`,
                height: `${VIDEO_HEIGHT}px`,
              }}
            >
              <MediaPlayer
                title="קווים לדמותם"
                src={story.url}
                muted={true}
                playsInline={true}
                style={{
                  'width': `${VIDEO_WIDTH}px`,
                  'height': `${VIDEO_HEIGHT}px`,
                  'backgroundColor': 'var(--kavim-blue)',
                  'borderRadius': '8px',
                  'overflow': 'hidden',
                  '--media-object-fit': 'cover',
                  '--media-object-position': 'center',
                }}
              >
                <MediaProvider
                  mediaProps={{
                    style: {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                />
                <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails="" />
              </MediaPlayer>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
const processImageSrc = (imageSrc: string) => {
  const mv2Index = imageSrc.indexOf('mv2');
  if (mv2Index === -1) return imageSrc;
  const endIndex = mv2Index + (imageSrc.includes('jpeg') ? 8 : 7);
  return prefix + imageSrc.slice(0, endIndex).replace('wix:image://v1/', '');
};

const processVideoSrc = (videoSrc: string) => {
  // Return original if not a Wix video URL
  if (!videoSrc.includes('wix:video://v1/')) return videoSrc;

  try {
    // Extract just the site ID
    const match = videoSrc.match(/wix:video:\/\/v1\/([^/]+)/);
    if (!match) return videoSrc;

    const [, siteId] = match;
    return `https://video.wixstatic.com/video/${siteId}/720p/mp4/file.mp4`;
  } catch (error) {
    console.error('Error processing video URL:', error);
    return videoSrc;
  }
};

interface SwiperGalleryProps {
  imageSrcArr: string[];
  aspectRatio?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
}

const SwiperGallery: React.FC<SwiperGalleryProps> = ({
  imageSrcArr,
  width = 'min-content',
  maxWidth = 'min-content',
  height = 'min-content',
}) => {
  return (
    <div className="w-full">
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
        speed={1000}
      >
        {imageSrcArr.map((imageSrc, index) => (
          <SwiperSlide
            key={`slide-${index}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              placeContent: 'center',
              width: 'min-content',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                placeContent: 'top',
                alignItems: 'center',
                rowGap: '10px',
                maxWidth,
                height,
                width,
              }}
            >
              <ImageModal
                imageSrc={imageSrc}
                processImageSrc={processImageSrc}
                alt={`תמונתו של ${imageSrc}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

interface ImageModalProps {
  imageSrc: string;
  processImageSrc: (src: string) => string;
  alt: string;
}

const ImageModal = ({ imageSrc, processImageSrc, alt }: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={processImageSrc(imageSrc)}
          style={{
            width: '200px',
            height: '200px',
            objectFit: 'cover',
            backgroundColor: 'var(--kavim-blue)',
          }}
          alt={alt}
          loading="lazy"
        />
      </div>

      {isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 left-0 w-full h-full flex align-items-center justify-content-center z-5"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '90vw', maxHeight: '90vh' }}
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 m-2 p-2 cursor-pointer"
                  type="button"
                  style={{ border: 'none', background: 'transparent' }}
                >
                  <i className="pi pi-times text-2xl text-white" />
                </button>
                <img
                  src={processImageSrc(imageSrc)}
                  alt={alt}
                  style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
