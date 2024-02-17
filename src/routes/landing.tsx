import { useLoaderData } from 'react-router-dom';
import { Hero } from '../components/hero';
import { OurActivity } from '../components/ourActivity';

import { Helmet } from 'react-helmet-async';
import { ContactForm } from '../components/contactForm';
import { ThanksSection } from '../components/thanksSection';
export type Volunteer = {
  name: string;
  role: string;
  image: string;
  link: string;
  isPainter: boolean;
  order: number;
};
type WixData = {
  ourActivity: string[];
  volunteers: Volunteer[];
};
export default function Landing() {
  //@ts-expect-error because wix data is unknown
  const wixData: WixData = useLoaderData();
  console.log(wixData);
  return (
    <div
      className="min-h-screen"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(3,minmax(1svh,min-content))',
        fontSize: '16pt',
      }}
    >
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
      <Hero />
      <OurActivity fileNameArr={wixData.ourActivity} />
      <ContactForm />
      <ThanksSection volunteerArr={wixData.volunteers} />
      <h3 className="fixed bottom-0 mr-7">האתר בבנייה, תודה על הסבלנות!</h3>
    </div>
  );
}
