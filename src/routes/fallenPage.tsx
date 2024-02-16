import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { getMetaTags, prefix } from '../utils';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';

export default function FallenPage() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  //@ts-expect-error wixdata isnt known
  const fallenData: Contact = useLoaderData();
  console.log(fallenData);

  return !fallenData ? (
    <>
      {'קישור לא תקין -> לחצו לחזרה לעמוד כל הנופלים'}
      <Link to={'/allFallen'} className="mr-3">
        {'כאן'}
      </Link>
    </>
  ) : (
    <>
      {fallenData && getMetaTags(fallenData)}
      <div className="mt-3 flex flex-column pb-3 px-3 md:px-8 pt-5 mb-8">
        <div className="flex flex-column-reverse md:flex-row gap-4 justify-content-between">
          <div>
            <h2 className="mt-0">
              {fallenData.name}
              {' - קווים לדמותו'}
            </h2>
            <p className="text-justify" style={{ maxWidth: '50ch' }}>
              {fallenData.story}
            </p>
          </div>{' '}
          {fallenData.mediagallery && (
            <img
              alt={`התמונה של: ${fallenData.name}`}
              src={`${prefix + fallenData.mediagallery[0].slug}`}
              style={{ maxHeight: '725px' }}
            />
          )}
        </div>
        <Button
          className="w-fit"
          label="לכתיבה נוספת"
          onClick={() => setVisible(true)}
        />
        <Dialog
          header={`תיבת סיפור על ${fallenData.name}`}
          visible={visible}
          onHide={() => setVisible(false)}
          className="bg-white p-5"
          style={{ width: '80vw' }}
        >
          <div className="py-3">
            <InputTextarea
              autoResize
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={5}
              className="w-full"
            />
          </div>
        </Dialog>
      </div>
    </>
  );
}
