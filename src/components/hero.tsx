import { Link } from 'react-router-dom';

const heroText = `‘קווים לדמותם׳ הינו מיזם הנצחה  התנדבותי 
אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים וסיפורים אישיים.
כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן הסיפורים נכתבים ע״י המשפחות והחברים.

האתר הוקם כמקום בו תוכלו לשתף, להעלות זכרונות ולספר קצת על מי שהיו, וקצת על מה שהשאירו אחריהם. 
ובשביל שכמה שיותר יוכלו להכיר, לשאוב השראה, וללמוד,
 על הגיבורים הראשיים שכבר אינם, אך סיפורם יחיה לעד.
דרך דמותם היפה בקווים ודרך הסיפורים.`;

export function Hero() {
  const scrollToParagraph = () => {
    const paragraphElement = document.getElementById('long-paragraph');

    if (paragraphElement) {
      paragraphElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  return (
    <>
      <div className="relative flex flex-column justify-content-center align-items-center md:px-7">
        <div className={`square `}>
          <span></span>
          <span></span>
          <span></span>
          <div className="content flex flex-column align-items-center h-full">
            <h1
              className="md:text-6xl rubik-dirt white-space-nowrap"
              style={{ maxWidth: '10ch' }}
            >
              קווים לדמותם
            </h1>
            {window.innerWidth > 768 && (
              <p
                className="font-light md:text-lg text-justify"
                style={{ maxWidth: '500px' }}
              >
                {
                  '‘קווים לדמותם׳ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים וסיפורים אישיים.'
                }
              </p>
            )}
            <div className="flex flex-wrap md:gap-3 justify-content-center">
              <button className="cursor-pointer" onClick={scrollToParagraph}>
                {'קראו עוד'}
              </button>
              <Link to={'/allFallen'}>{'עמוד הנופלים'}</Link>
            </div>
          </div>
        </div>
      </div>
      <p
        id="long-paragraph"
        className="font-light md:text-lg text-justify mt-7 px-3 md:px-0"
        style={{ maxWidth: '500px' }}
      >
        {heroText}
      </p>
    </>
  );
}
