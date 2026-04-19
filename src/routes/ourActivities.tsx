import schoolCapIcon from '../assets/school-cap-icon.svg';
import helmetIcon from '../assets/helmet-icon.svg';
import familyIcon from '../assets/family-icon.svg';
import schoolBanner from '../assets/school-activity-banner.jpg';
import armyBanner from '../assets/army-activity-banner.jpg';
import activityBanner from '../assets/activity-hero-banner.jpg';
import familyStoriesBanner from '../assets/family-stories-activity-banner.jpg';
import { useLoaderData } from 'react-router-dom';
import { useMemo } from 'react';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import { ImageStrip } from '../components/ImageStrip';
import { ActivitiesData } from '../types';

const VIDEO_WIDTH = 216;
const VIDEO_HEIGHT = 374;

function processVideoSrc(videoSrc: string): string {
  if (!videoSrc.includes('wix:video://v1/')) return videoSrc;
  const match = videoSrc.match(/wix:video:\/\/v1\/([^/]+)/);
  if (!match) return videoSrc;
  return `https://video.wixstatic.com/video/${match[1]}/720p/mp4/file.mp4`;
}

export function OurActivities() {
  const data = useLoaderData() as ActivitiesData;

  return (
    <div
      className="flex flex-column gap-7"
      style={{ minHeight: '100svh', marginBottom: '200px' }}
    >
      <ActivitiesHero />
      <FamilyStoriesActivities
        familyStoriesGallery={data.familySAtoriesActivity}
      />
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
      style={{ maxWidth: '100ch', width: '90svw' }}
    >
      <h2 style={{ color: 'var(--kavim-darkblue)' }}>הפעילות שלנו</h2>
      <p>
        קווים לדמותם פועלים להנצחת הנופלים בכל מקום צורה וזמן, על מנת כמה שיותר
        יוכלו להכיר, ללמוד, ולזכור - את הגיבורים שכבר אינם, אך סיפורם יחיה לעד.
      </p>
      <img src={activityBanner} className="w-full mt-3" alt="פעילות קווים לדמותם" />
    </div>
  );
}

function ActivitySection({
  icon,
  title,
  description,
  banner,
  bannerAlt,
  gallery,
  background,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  banner: string;
  bannerAlt: string;
  gallery: string[];
  background?: string;
}) {
  const images = gallery.filter((f) => f.includes('wix:image://v1/'));
  return (
    <div
      style={{ minHeight: '70svh', background }}
      className="w-screen"
    >
      <div className="max-w-screen sm:pt-7 flex flex-column align-items-center">
        <span
          className="flex flex-column align-items-center text-center mx-auto my-7 px-7 gap-3"
          style={{ maxWidth: '100ch', width: '90svw' }}
        >
          {icon}
          <h2 style={{ color: 'var(--kavim-darkblue)' }}>{title}</h2>
          <p>{description}</p>
        </span>
        <img
          src={banner}
          alt={bannerAlt}
          className="mb-7"
          loading="lazy"
          style={{ maxWidth: '100ch', width: '90svw' }}
        />
        <div className="mx-8" style={{ maxWidth: '100ch', width: '90svw' }}>
          <ImageStrip srcs={images} />
        </div>
      </div>
    </div>
  );
}

function ArmyActivities({ armyGallery }: { armyGallery: string[] }) {
  return (
    <ActivitySection
      icon={
        <img src={helmetIcon} className="w-3rem h-3rem" alt="" aria-hidden />
      }
      title={'פעילות עם צה"ל'}
      description="פעילויות משותפות עם צהל, גופים ממשלתיים ואירועי הנצחה."
      banner={armyBanner}
      bannerAlt="באנר פעילות צבאית"
      gallery={armyGallery}
    />
  );
}

function SchoolActivities({ schoolGallery }: { schoolGallery: string[] }) {
  return (
    <ActivitySection
      icon={
        <img src={schoolCapIcon} className="w-3rem h-3rem" alt="" aria-hidden />
      }
      title="פעילות בבתי ספר"
      description="פעילויות משותפות עם בתי ספר, מוסדות חינוך וארגונים חברתיים."
      banner={schoolBanner}
      bannerAlt="באנר פעילות בבתי ספר"
      gallery={schoolGallery}
      background="linear-gradient(0deg, #ffffff 45.26%, var(--kavim-lightblue) 100%)"
    />
  );
}

function FamilyStoriesActivities({
  familyStoriesGallery,
}: {
  familyStoriesGallery: string[];
}) {
  return (
    <ActivitySection
      icon={
        <img src={familyIcon} className="w-3rem h-3rem" alt="" aria-hidden />
      }
      title="משפחה מספרת"
      description="פעילויות משותפות עם משפחות הנופלים."
      banner={familyStoriesBanner}
      bannerAlt="באנר משפחה מספרת"
      gallery={familyStoriesGallery}
      background="linear-gradient(0deg, #ffffff 45.26%, var(--kavim-lightblue) 100%)"
    />
  );
}

function AbroadActivities({ abroadGallery }: { abroadGallery: string[] }) {
  const videoUrls = useMemo(
    () =>
      abroadGallery
        .filter((u) => u.includes('wix:video://v1/'))
        .map(processVideoSrc),
    [abroadGallery]
  );

  return (
    <div style={{ minHeight: '70svh' }}>
      <span
        className="flex flex-column align-items-center text-center mx-auto mb-7 gap-3"
        style={{ maxWidth: '100ch' }}
      >
        <i
          className="pi pi-globe text-3xl w-3rem h-3rem"
          style={{ color: 'var(--kavim-darkblue)' }}
          aria-hidden
        />
        <h2 style={{ color: 'var(--kavim-darkblue)' }}>ברחבי העולם</h2>
        <p style={{ maxWidth: '100ch', width: '90svw' }}>
          מדבקות לדמותם של הנופלים מחולקות לצעירים מסביב לעולם - שמעבירים את
          הסיפורים הלאה, מחזקים את המשפחות ומשאירים זכרונות בדמותם במקומות הכי
          יפים.
          <br />
          <br /> *כל הסרטונים שנשלחים אלינו מועברים למשפחות.
        </p>
      </span>

      <div className="mx-8">
        <div className="img-strip img-strip--video">
          {videoUrls.map((url, i) => (
            <div
              key={i}
              className="img-strip__item img-strip__item--video"
              style={{ width: `${VIDEO_WIDTH}px`, height: `${VIDEO_HEIGHT}px` }}
            >
              <MediaPlayer
                title="קווים לדמותם"
                src={url}
                muted
                playsInline
                style={{
                  width: `${VIDEO_WIDTH}px`,
                  height: `${VIDEO_HEIGHT}px`,
                  backgroundColor: 'var(--kavim-blue)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '--media-object-fit': 'cover',
                  '--media-object-position': 'center',
                } as React.CSSProperties}
              >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} thumbnails="" />
              </MediaPlayer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
