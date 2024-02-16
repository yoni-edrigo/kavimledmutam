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
export function ContactForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <div className="p-5 relative overflow-hidden">
      <h3 style={{ color: 'var(--kavim-darkblue)' }}>
        אני רוצה להזמין קווים לדמותו של הגיבור\ה שלי
      </h3>
      <span>אנא השאירו פרטים ואנו נחזור אליכם בהקדם</span>

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
            {errors.fName && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'lName' }}>
            <label>שם משפחה</label>
            <input
              className="form-input"
              {...register('lName', { required: true })}
            />
            {errors.lName && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'phone' }}>
            <label>טלפון</label>
            <input
              className="form-input"
              {...register('phone', { required: true })}
            />
            {errors.phone && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'email' }}>
            <label>כתובת מייל</label>
            <input
              className="form-input"
              {...register('email', { required: true })}
            />
            {errors.email && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'hero' }}>
            <label>שם הגיבור/ה שלי</label>
            <input
              className="form-input"
              {...register('hero', { required: true })}
            />
            {errors.hero && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'image' }}>
            <label>תמונה</label>
            <input
              className="form-input"
              {...register('image', { required: true })}
            />
            {errors.image && <label>This field is required</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'citation' }}>
            <label>כותרת/ציטוט</label>
            <input
              className="form-input"
              {...register('citation', { required: true })}
            />
            {errors.citation && <label>This field is required</label>}
          </span>
          <button
            className="form-button mt-8"
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
