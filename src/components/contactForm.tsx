import { Toast } from 'primereact/toast';

import { useForm, SubmitHandler } from 'react-hook-form';
import landingElement from '../assets/landingElement.png';
import { useRef } from 'react';
type Inputs = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  hero: string;
  address: string;
  citation: string;
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
  return (
    <div className="page-grid relative mt-5 mb-7 overflow-hidden max-w-screen">
      <Toast ref={toast} />
      <span
        className="flex flex-column gap-3 mb-5"
        style={{ gridArea: 'centerContent' }}
      >
        <h2 style={{ color: 'var(--kavim-darkblue)' }}>
          אני רוצה להזמין קווים לדמותו של הגיבור\ה שלי
        </h2>
        <p style={{ fontSize: '1.1rem' }}>
          אנא השאירו פרטים ואנו נחזור אליכם בהקדם
        </p>
      </span>

      <div
        className="contact-form-wrapper flex p-3 border-round-lg relative"
        style={{
          gridArea: 'centerContent2',
          marginRight: '5vw',
          marginLeft: '5vw',
        }}
      >
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
          <span className="flex flex-column" style={{ gridArea: 'address' }}>
            <label htmlFor="address">כתובת למשלוח</label>
            <input className="form-input" {...register('address')} />
          </span>
          <span className="flex flex-column" style={{ gridArea: 'citation' }}>
            <label htmlFor="citation">כותרת/ציטוט (אופציונלי)</label>
            <input className="form-input" {...register('citation')} />
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
  );
}
