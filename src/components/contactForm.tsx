import { useForm, SubmitHandler } from 'react-hook-form';
import landingElement from '../assets/landingElement.png';
type Inputs = {
  fName: string;
  lName: string;
  phone: string;
  email: string;
  hero: string;
  image: string;
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
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataToSend = { ...data };
    console.log(dataToSend);
    postRequest(dataToSend);
  };
  return (
    <div className="p-5 relative overflow-hidden">
      <h2 style={{ color: 'var(--kavim-darkblue)' }}>
        אני רוצה להזמין קווים לדמותו של הגיבור\ה שלי
      </h2>
      <p className="mb-7">אנא השאירו פרטים ואנו נחזור אליכם בהקדם</p>

      <div className="contact-form-wrapper flex p-3 border-round-lg relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="contact-form gap-4 border-1 border-white border-round-lg p-5 w-full"
        >
          <span className="flex flex-column " style={{ gridArea: 'fName' }}>
            <label>שם פרטי</label>
            <input
              className="form-input"
              {...register('fName', { required: true })}
            />
            {errors.fName && (
              <label className="text-red-500">זהו שדה חובה</label>
            )}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'lName' }}>
            <label>שם משפחה</label>
            <input
              className="form-input"
              {...register('lName', { required: true })}
            />
            {errors.lName && (
              <label className="text-red-500">זהו שדה חובה</label>
            )}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'phone' }}>
            <label>טלפון</label>
            <input
              className="form-input"
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <label className="text-red-500">זהו שדה חובה</label>
            )}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'email' }}>
            <label>כתובת מייל</label>
            <input
              className="form-input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <label className="text-red-500">זהו שדה חובה</label>
            )}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'hero' }}>
            <label>שם הגיבור/ה שלי</label>
            <input
              className="form-input"
              {...register('hero', { required: true })}
            />
            {errors.hero && (
              <label className="text-red-500">זהו שדה חובה</label>
            )}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'image' }}>
            <label>קישור לתמונה (אופציונלי)</label>
            <input className="form-input" {...register('image')} />
          </span>
          <span className="flex flex-column" style={{ gridArea: 'citation' }}>
            <label>כותרת/ציטוט (אופציונלי)</label>
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
      </div>
      <img src={landingElement} className="landing-element" />
    </div>
  );
}
