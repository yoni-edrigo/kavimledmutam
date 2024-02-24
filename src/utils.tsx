import { Helmet } from 'react-helmet-async';
import { Contact } from './routes/root';

export const prefix = 'https://static.wixstatic.com/media/';
export const removeUnusedDataFromUrl = (url: string) => {
  // Handle potential errors:
  if (!url.startsWith('wix:image://v1/')) {
    throw new Error('Invalid Wix URL format'); // Or return a default value
  }

  const allowedExtensions = ['.jpg', '.png', '.svg'];
  const extensionIndex = allowedExtensions.findIndex((ext) =>
    url.includes(ext)
  );

  if (extensionIndex === -1) {
    throw new Error('Unsupported file extension'); // Or return a default value
  }

  const tempUrl = url
    .replace('wix:image://v1/', prefix)
    .slice(0, extensionIndex + 4);

  // Log for debugging (optional):
  console.log(tempUrl);

  return tempUrl;
  // wix:image://v1/557f26_db69102dd0af435ab2bb8ece5d6fedb5~mv2.jpg/322117720_691162432500140_4412115213330647962_n.jpg__nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc#originWidth=880&originHeight=879
};

export const getMetaTags = (fallenData: Contact) => {
  return (
    <Helmet prioritizeSeoTags>
      <title>{`קווים לדמותם | ${fallenData.name}`}</title>
      <meta
        name="description"
        content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
      />
      {/* <!-- Open Graph / Facebook --> */}
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

      {/* <!-- Twitter --> */}
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
