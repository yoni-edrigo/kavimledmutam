import '../styles/landing-video.css';
export function LandingVideo() {
  return (
    <section className="video-section lg:py-7">
      <video
        src={
          'https://video.wixstatic.com/video/557f26_f183b7fde5bb4388896e2721da8c6a6a/480p/mp4/file.mp4'
        }
        controls
        autoPlay
        muted
        loop
      />
    </section>
  );
}
