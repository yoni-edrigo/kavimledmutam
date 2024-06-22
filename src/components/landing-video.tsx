import '../styles/landing-video.css';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
export function LandingVideo() {
  return (
    <section className="video-section lg:py-7 ">
      {/* <video
        src={
          'https://video.wixstatic.com/video/557f26_f183b7fde5bb4388896e2721da8c6a6a/480p/mp4/file.mp4'
        }
        controls
        autoPlay
        muted
        loop
      /> */}
      <MediaPlayer
        title="קווים לדמותם"
        src="https://video.wixstatic.com/video/557f26_f183b7fde5bb4388896e2721da8c6a6a/480p/mp4/file.mp4"
        autoPlay={true}
        muted={true}
        playsInline={true}
        style={{ maxWidth: '80vw' }}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </section>
  );
}
