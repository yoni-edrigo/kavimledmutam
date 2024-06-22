import { Toast } from 'primereact/toast';

import { useForm, SubmitHandler } from 'react-hook-form';
import landingElement from '../assets/landingElement.png';
import { useRef } from 'react';
import penIcon from '../assets/penIcon.svg';
import giftIcom from '../assets/giftIcon.svg';
import drawingIcon from '../assets/drawingIcon.svg';
import checkMarkIcon from '../assets/checkMarkIcon.svg';
type Inputs = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  hero: string;
  address: string;
  relation: string;
};

const postRequest = async (requestData: Inputs): Promise<void> => {
  try {
    const response = await fetch(
      'https://yonivas0.editorx.io/kavimledmutam/_functions/postDrawingRequest',
      {
        method: 'POST',
        mode: 'no-cors', // Set the request mode to 'no-cors'
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(requestData),
      }
    );

    console.log(
      'Comment posted successfully! (Response ignored due to no-cors mode)',
      response
    );
  } catch (error) {
    console.error('Error posting comment:', error);
  }
};

export function ContactForm() {
  const toast = useRef(null);
  const show = (isSuccess: boolean) => {
    toast.current &&
      //@ts-expect-error because
      toast.current.show({
        severity: isSuccess ? 'success' : 'error',
        summary: isSuccess ? 'תגובה נשלחה בהצלחה' : 'שגיאה בשליחה',
        detail: isSuccess
          ? 'מתנדב מתטעמנו יצור קשר בהקדם'
          : 'שגיאה בשליחה נסו שוב או פנו לעזרה ביצירת קשר',
      });
  };
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataToSend = { ...data };
    console.log('dataToSend', dataToSend);

    postRequest(dataToSend)
      .then(() => {
        show(true);
        reset();
      })
      .catch((error) => {
        console.error('Error posting comment:', error);
        show(false);
      });
  };
  // const [isFormShown, setIsFormShown] = useState(false);

  return (
    <div className="flex flex-column gap-5" style={{ gridColumn: '1 / -1' }}>
      <div
        className="w-full relative mt-5 pb-7 overflow-hidden max-w-screen"
        style={{
          background: `linear-gradient(180deg, #ffffff 45.26%, #c5dfff 100%)`,
          minHeight: '80svh',
          placeContent: 'center',
        }}
      >
        <Toast ref={toast} />
        <span
          className="flex flex-column gap-3 mb-5 align-items-center text-center"
          style={{ gridArea: 'centerContent' }}
        >
          <h2
            className="text-center"
            style={{ color: 'var(--kavim-darkblue)' }}
          >
            <span
              className="font-medium"
              style={{ color: 'var(--kavim-text)' }}
            >
              אני רוצה להזמין קווים לדמותו\ה של הגיבור\ה שלי
            </span>
            <br />
            <br />
            אז איך זה עובד?
          </h2>
          {/* {!isFormShown && (
            <h2 style={{ color: 'var(--kavim-darkblue)' }}>אז איך זה עובד?</h2>
          )} */}
          <div className="flex flex-wrap mt-7 md:row-gap-7 row-gap-5 column-gap-3 justify-content-center">
            <div className="proccess-card-grid max-w-15rem">
              <img src={penIcon} />

              <h3>שלב 1</h3>

              <p>
                אתם <span className="font-bold">ממלאים פרטים</span> ואנחנו
                דואגים ליצור אתכם קשר להתחלת התהליך.
              </p>
            </div>
            <div className="proccess-card-grid max-w-15rem">
              <img src={drawingIcon} />

              <h3>שלב 2</h3>

              <p>
                המאיירים שלנו <span className="font-bold">מאיירים</span> את
                האיור וכותבי התוכן שלנו{' '}
                <span className="font-bold">כותבים</span> את הסיפור.
              </p>
            </div>
            <div className="proccess-card-grid max-w-15rem">
              <img src={checkMarkIcon} />

              <h3>שלב 3</h3>

              <p>
                האיור והסיפור נשלחים אליכם{' '}
                <span className="font-bold">לאישור</span> ולאחר מכן, להדפסה,
                מסגור ואריזה. במקביל, צוות הדיגיטל שלנו מתחיל בבניית עמוד
                הזיכרון.
              </p>
            </div>
            <div className="proccess-card-grid max-w-15rem">
              <img src={giftIcom} />

              <h3>שלב 4</h3>

              <p>
                בשלב זה, <span className="font-bold">המשימה היא שלכם</span> -
                לשתף את העמוד עם חבריו של הנופל, במטרה שימלאו אותו בזכרונות לפני
                שמשפחתו מקבלת את המחווה.
              </p>
            </div>
            <div className="proccess-card-grid max-w-15rem">
              <img src={giftIcom} />

              <h3>שלב 5</h3>

              <p>
                אתם מקבלים את האיור,{' '}
                <span className="font-bold">מוסרים אותו למשפחה</span> וחושפים
                בפניהם את האתר עם כל הסיפורים והזכרונות שהחברים כבר השאירו.
              </p>
            </div>
          </div>
        </span>
      </div>
      <div className="min-h-screen md:p-7 w-full" id="form">
        <p style={{ fontSize: '1.1rem' }} className="md:mb-7 mb-5 px-3 md:px-0">
          אנא השאירו פרטים ואנו נחזור אליכם בהקדם
        </p>
        <div
          style={{
            gridArea: 'centerContent2',
            marginRight: '5vw',
            marginLeft: '5vw',
          }}
        >
          <div className="contact-form-wrapper flex p-3 border-round-lg relative">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form gap-4 border-1 border-white border-round-lg p-3 md:p-5 w-full z-1"
            >
              <span className="flex flex-column " style={{ gridArea: 'fName' }}>
                <label htmlFor="fName">שם פרטי</label>
                <input
                  className="form-input"
                  {...register('fName', { required: true })}
                />
                {errors.fName && (
                  <label className="text-red-500">זהו שדה חובה</label>
                )}
              </span>
              <span className="flex flex-column" style={{ gridArea: 'lName' }}>
                <label htmlFor="lName">שם משפחה</label>
                <input
                  className="form-input"
                  {...register('lName', { required: true })}
                />
                {errors.lName && (
                  <label className="text-red-500">זהו שדה חובה</label>
                )}
              </span>
              <span className="flex flex-column" style={{ gridArea: 'phone' }}>
                <label htmlFor="phone">טלפון</label>
                <input
                  className="form-input"
                  {...register('phone', { required: true })}
                />
                {errors.phone && (
                  <label className="text-red-500">זהו שדה חובה</label>
                )}
              </span>
              <span className="flex flex-column" style={{ gridArea: 'email' }}>
                <label htmlFor="email">כתובת מייל</label>
                <input
                  className="form-input"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <label className="text-red-500">זהו שדה חובה</label>
                )}
              </span>
              <span className="flex flex-column" style={{ gridArea: 'hero' }}>
                <label htmlFor="hero">שם הגיבור/ה שלי</label>
                <input
                  className="form-input"
                  {...register('hero', { required: true })}
                />
                {errors.hero && (
                  <label className="text-red-500">זהו שדה חובה</label>
                )}
              </span>
              <span
                className="flex flex-column"
                style={{ gridArea: 'address' }}
              >
                <label htmlFor="address">כתובת למשלוח</label>
                <input className="form-input" {...register('address')} />
              </span>
              <span
                className="flex flex-column"
                style={{ gridArea: 'relation' }}
              >
                <label htmlFor="relation">קשר לגיבור</label>
                <input className="form-input" {...register('relation')} />
              </span>
              <button
                className="form-button mt-8 cursor-pointer"
                type="submit"
                style={{ gridArea: 'sendButton', justifySelf: 'center' }}
              >
                סיום הזמנה
              </button>
            </form>
            <img
              src={landingElement}
              alt="landing element"
              className="landing-element z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
