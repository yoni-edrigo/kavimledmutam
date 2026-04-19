import { Helmet } from 'react-helmet-async';
import { Contact } from './types';

export const prefix = 'https://static.wixstatic.com/media/';

export function wixImageUrl(src: string): string {
  const clean = src.replace('wix:image://v1/', '');
  const mv2 = clean.indexOf('mv2');
  if (mv2 === -1) return prefix + clean;
  const end = mv2 + (clean.includes('jpeg') ? 8 : 7);
  return prefix + clean.slice(0, end);
}

export const getMetaTags = (fallenData: Contact) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{`קווים לדמותם | ${fallenData.name}`}</title>
      <meta
        name="description"
        content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`https://kavimledmutam.co.il/fallenCard/${fallenData._id}`}
      />
      <meta property="og:title" content={`קווים לדמותם | ${fallenData.name}`} />
      <meta property="og:description" content={`${fallenData.story}`} />
      <meta
        property="og:image"
        content={
          fallenData.mediagallery
            ? `${prefix}${fallenData.mediagallery[0].src}`
            : '../kavimledmutam_logo.jpeg'
        }
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={`https://kavimledmutam.co.il/fallenCard/${fallenData._id}`}
      />
      <meta
        property="twitter:title"
        content="קווים לדמותם | הנצחת נופלי חרבות ברזל"
      />
      <meta property="twitter:description" content={`${fallenData.story}`} />
      <meta
        property="twitter:image"
        content={
          fallenData.mediagallery
            ? `${prefix}${fallenData.mediagallery[0].src}`
            : '../kavimledmutam_logo.jpeg'
        }
      />
    </Helmet>
  );
};
