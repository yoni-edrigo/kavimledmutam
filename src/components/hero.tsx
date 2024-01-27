import { Candle } from './candle';

const heroText = `"קווים לדמותם״ הינו מיזם הנצחה  התנדבותי 
אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים.
כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה.

האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד.

אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים.`;

export function Hero() {
  return (
    <div className="relative">
      <div className="mt-7">
        <h1
          className="text-7xl rubik-dirt"
          style={{ mixBlendMode: 'difference', maxWidth: '400px' }}
        >
          קווים לדמותם
        </h1>
        <p
          className="font-light text-lg text-justify"
          style={{ mixBlendMode: 'difference', maxWidth: '400px' }}
        >
          {heroText}
        </p>
      </div>
      <div
        className="absolute"
        style={{ zIndex: '-1', left: '10rem', bottom: '-80px' }}
      >
        <Candle isLit={true} />
      </div>
    </div>
  );
}
