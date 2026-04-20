import { Await, useLoaderData } from 'react-router-dom';
import { Hero } from '../components/hero';
// import { OurActivity } from '../components/ourActivity';

import { Helmet } from 'react-helmet-async';
// import { ContactForm } from '../components/contactForm';
import { ThanksSection } from '../components/thanksSection';
import React from 'react';
import { FallenSection } from '../components/landingFallenSection';
import { Contact } from './root';
// import { TraceableLine } from '../utils/traceable-line';

// import landindDashedLine from '../assets/landing-horizontal-dashed-line.svg';
import { LandingVideo } from '../components/landing-video';

export type Volunteer = {
  name: string;
  role: string;
  image: string;
  link: string;
  isPainter: boolean;
  order: number;
};
export type WixData = {
  ourActivity: string[];
  volunteers: Volunteer[];
  uploadUrl: string;
  fallenData: Contact[];
};
export default function Landing() {
  const data = useLoaderData();
  // const [wixData, setWixData] = useState<WixData>();
  // // console.log(wixData);
  // useEffect(() => {
  //   //@ts-expect-error abc
  //   if (data.wixData) {
  //     //@ts-expect-error abc
  //     setWixData(data.wixData);
  //   }
  //   //@ts-expect-error abc
  // }, [data.wixData]);
  return (
    <div style={{ padding: window.innerWidth < 1000 ? '0' : '', margin: '0' }}>
      <Helmet prioritizeSeoTags>
        <title>קווים לדמותם | הנצחת נופלי חרבות ברזל</title>
        <meta
          name="description"
          content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kavimledmutam.co.il/" />
        <meta
          property="og:title"
          content="קווים לדמותם | הנצחת נופלי חרבות ברזל"
        />
        <meta
          property="og:description"
          content="קווים לדמותם״ הינו מיזם הנצחה
        התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים
        וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה
        למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר,
        ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו
        מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה
        שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
        <meta property="og:image" content="/kavimledmutam_logo.jpeg" />
        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kavimledmutam.co.il/" />
        <meta
          property="twitter:title"
          content="קווים לדמותם | הנצחת נופלי חרבות ברזל"
        />
        <meta
          property="twitter:description"
          content="קווים לדמותם״ הינו מיזם הנצחה
        התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים
        וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה
        למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר,
        ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו
        מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה
        שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
        <meta property="twitter:image" content="/kavimledmutam_logo.jpeg" />
      </Helmet>
      <LandingVideo />
      <Hero />
      <React.Suspense fallback={<p>טוען נתונים...</p>}>
        <Await
          //@ts-expect-error cannot get types from wix
          resolve={data.wixData}
          errorElement={<p>שגיאה בטעינת נתונים.. צרו קשר עם יוני</p>}
        >
          {(wixDataProps) => {
            return (
              wixDataProps && (
                <>
                  {/* <OurActivity fileNameArr={wixData.ourActivity} /> */}
                  {/* <ContactForm /> */}
                  {/* <div
                    style={{
                      minHeight: window.innerWidth < 768 ? '10rem' : '20rem',
                      backgroundImage: `url(${landindDashedLine})`,
                    }}
                    className="max-w-screen bg-top bg-cover bg-no-repaet mb-7"
                  ></div> */}
                  <FallenSection fallenArr={wixDataProps.fallenData} />
                  <ThanksSection volunteerArr={wixDataProps.volunteers} />
                </>
              )
            );
          }}
        </Await>
      </React.Suspense>
      {/* <div className="fixed" style={{ left: '0%', bottom: '0svh' }}>
        <TraceableLine pathString={getPath()} />
      </div> */}
    </div>
  );
}
