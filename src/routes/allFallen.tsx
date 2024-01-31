import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { Helmet } from 'react-helmet-async';
import { Card } from 'primereact/card';
import { prefix } from '../utils';
export default function AllFallen() {
  //@ts-expect-error wixdata isnt known
  const wixData: Contact[] = useLoaderData();
  console.log(wixData);
  const FallenBox = ({ fallenData }: { fallenData: Contact }) => {
    return (
      <Link
        to={`/fallenCard/${fallenData._id}`}
        className="bg-white min-h-10rem border-round-xl p-3"
      >
        <Card
          header={
            fallenData.mediagallery && (
              <img
                alt="fallen iamge"
                src={`${prefix + fallenData.mediagallery[0].slug}`}
              />
            )
          }
          // title={fallenData && fallenData.name}
          subTitle={
            <button className="cursor-pointer">{fallenData.name}</button>
          }
        ></Card>
      </Link>
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
      <div className="fallen-grid">
        {wixData &&
          wixData.map((fallenContact, index) => (
            <FallenBox key={index} fallenData={fallenContact} />
          ))}
      </div>
    </div>
  );
}
