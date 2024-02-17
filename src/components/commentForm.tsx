import { useForm, SubmitHandler } from 'react-hook-form';
import landingElement from '../assets/landingElement.png';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
const dropdownOptions = [
  { label: 'חשוב לי שידעו עליו...' },
  { label: 'הזכרון הכי גדול שלי ממנו...' },
  { label: 'אני לא אשכח את...' },
  { label: 'למדתי ממנו...' },
  { label: 'בזכותו לקחתי על עצמי...' },
];
type Inputs = {
  fName: string;
  lName: string;
  phone: string;
  comment: string;
};
const postComment = async (commentData: Inputs): Promise<void> => {
  try {
    const response = await fetch(
      'https://yonivas0.editorx.io/kavimledmutam/_functions/postComment',
      {
        method: 'POST',
        mode: 'no-cors', // Set the request mode to 'no-cors'
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(commentData),
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
export function CommentForm({ fallenId }: { fallenId: string }) {
  const [selectedPrefix, setSelectedPrefix] = useState(
    dropdownOptions[0].label
  );
  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const dataToSend = { ...data, fallenId: fallenId };
    console.log(dataToSend);
    postComment(dataToSend);
  };

  useEffect(() => {
    // Set the initial value of the comment field based on the selected dropdown value
    setValue('comment', selectedPrefix.replace('...', ' '));
  }, [setValue, selectedPrefix]);
  const handleDropdownChange = (e: { value: string }) => {
    setSelectedPrefix(e.value);
    setValue('comment', e.value.replace('...', ' ')); // Set the dropdown value to the comment field
  };
  return (
    <div className=" relative overflow-hidden">
      <div className="comment-form-wrapper flex p-3 border-round-lg relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="comment-form gap-4 border-1 border-white border-round-lg p-5 w-full z-1"
        >
          <span className="flex flex-column " style={{ gridArea: 'fName' }}>
            <label>שם פרטי</label>
            <InputText
              className="form-input"
              {...register('fName', { required: true })}
            />
            {errors.fName && <label>זהו שדה חובה</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'lName' }}>
            <label>שם משפחה</label>
            <InputText
              className="form-input"
              {...register('lName', { required: true })}
            />
            {errors.lName && <label>זהו שדה חובה</label>}
          </span>
          <span className="flex flex-column" style={{ gridArea: 'phone' }}>
            <label>טלפון (אופציונלי)</label>
            <InputText className="form-input" {...register('phone')} />
          </span>
          <span className="flex flex-column" style={{ gridArea: 'prefix' }}>
            <label>מה תרצו לשתף?</label>
            <Dropdown
              className="form-input"
              options={dropdownOptions}
              value={selectedPrefix}
              onChange={handleDropdownChange}
              pt={{ input: { className: 'p-0 pt-1 px-2' } }}
              optionValue="label"
            />
          </span>
          <span className="flex flex-column" style={{ gridArea: 'comment' }}>
            <InputTextarea
              className="form-input"
              style={{ minHeight: '200px' }}
              {...register('comment', { required: true })}
              autoResize
            />
            {errors.comment && <label>זהו שדה חובה</label>}
          </span>
          <button
            className="form-button"
            type="submit"
            style={{ gridArea: 'sendButton', justifySelf: 'center' }}
          >
            שלח
          </button>
        </form>
      </div>
      <img src={landingElement} className="landing-element z-0" />
    </div>
  );
}
