import logo from '../assets/logo.png';

const heroText1 = `‘קווים לדמותם׳ הינו מיזם הנצחה  התנדבותי 
אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים וסיפורים אישיים.
כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן הסיפורים נכתבים ע״י המשפחות והחברים.`;
const heroText2 = `
האתר הוקם כמקום בו תוכלו לשתף, להעלות זכרונות ולספר קצת על מי שהיו, וקצת על מה שהשאירו אחריהם. 
ובשביל שכמה שיותר יוכלו להכיר, לשאוב השראה, וללמוד,
 על הגיבורים הראשיים שכבר אינם, אך סיפורם יחיה לעד.
דרך דמותם היפה בקווים ודרך הסיפורים.`;

export function Hero() {
  return (
    <div className="flex px-5 pt-8 align-items-start justify-content-between">
      <div className="flex flex-column gap-3" style={{ maxWidth: '50ch' }}>
        <h3 style={{ color: 'var(--kavim-darkblue)' }}>מי אנחנו?</h3>
        <span>{heroText1}</span>
        <span>{heroText2}</span>
      </div>
      {window.innerWidth > 768 && (
        <img src={logo} alt="kavim ledmutam logo" className="w-4" />
      )}
    </div>
  );
}
