import landingVid from '../assets/landingVid.webm';
import '../styles/landing-video.css';
export function LandingVideo() {
  return (
    <section className="video-section lg:py-7">
      <video src={landingVid} controls autoPlay muted loop />
    </section>
  );
}
