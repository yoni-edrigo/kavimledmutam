import logo from '../assets/logo.png';
import { ScaledOnScroll } from './animate-wrapper';

export function Hero() {
  const heroText1 = `‘קווים לדמותם׳ הינו מיזם הנצחה  התנדבותי 
אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים וסיפורים אישיים.
כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן הסיפורים נכתבים ע״י המשפחות והחברים.`;
  const heroText2 = `
האתר הוקם כמקום בו תוכלו לשתף, להעלות זכרונות ולספר קצת על מי שהיו, וקצת על מה שהשאירו אחריהם. 
ובשביל שכמה שיותר יוכלו להכיר, לשאוב השראה, וללמוד,
 על הגיבורים הראשיים שכבר אינם, אך סיפורם יחיה לעד.
דרך דמותם היפה בקווים ודרך הסיפורים.`;
  return (
    <div className="page-grid mb-7" style={{ marginTop: '6rem' }}>
      <div
        className="flex flex-column gap-3"
        style={{ maxWidth: '50ch', gridArea: 'centerContent' }}
      >
        <h2 style={{ color: 'var(--kavim-darkblue)' }}>מי אנחנו?</h2>
        <p>{heroText1}</p>
        <p>{heroText2}</p>
      </div>
      {window.innerWidth > 768 && (
        <span style={{ gridArea: 'leftContent' }}>
          <ScaledOnScroll scaleValue={0.7}>
            <img
              src={logo}
              alt="kavim ledmutam logo"
              className="max-w-15rem ml-7"
            />
          </ScaledOnScroll>
        </span>
      )}
    </div>
  );
}
