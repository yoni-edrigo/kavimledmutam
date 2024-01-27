import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { Helmet } from 'react-helmet-async';
export default function AllFallen() {
  //@ts-expect-error wixdata isnt known
  const wixData: Contact[] = useLoaderData();
  console.log(wixData);
  const FallenBox = ({ fallenId }: { fallenId: string }) => {
    return (
      <div>
        <Link to={`/fallenCard/${fallenId}`}>
          {wixData && wixData.find((f) => f._id === fallenId)?.name}
        </Link>
      </div>
    );
  };
  return (
    <div>
      <Helmet>
        <title>קווים לדמותם | רשימת הנופלים</title>
        <meta
          name="description"
          content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
      </Helmet>
      {wixData &&
        wixData.map((fallenContact, index) => (
          <FallenBox key={index} fallenId={fallenContact._id} />
        ))}
    </div>
  );
}
