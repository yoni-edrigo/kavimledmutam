import { useLoaderData } from 'react-router-dom';
import { Hero } from '../components/hero';
import { Staff } from '../components/staff';
import { Contact } from './root';
import { Helmet } from 'react-helmet-async';

export default function Landing() {
  //@ts-expect-error wixdata isnt known
  const wixData: Contact[][] = useLoaderData();
  console.log(wixData);
  return (
    <div
      className="min-h-screen"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(2,minmax(100svh,min-content))',
      }}
    >
      <Helmet>
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
      {wixData && <Staff staffData={wixData[2]} />}
      <h3 className="fixed bottom-0 mr-7">האתר בבנייה, תודה על הסבלנות!</h3>
    </div>
  );
}
