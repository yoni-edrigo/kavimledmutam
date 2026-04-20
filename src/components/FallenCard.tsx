import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Contact } from '../routes/root';
import { prefix } from '../utils';
import { injectFont, getFontFamily } from '../fontUtils';

export function FallenCard({ fallenContact }: { fallenContact: Contact }) {
  useEffect(() => {
    if (fallenContact.fontUrl) injectFont(fallenContact.fontUrl);
  }, [fallenContact.fontUrl]);

  const fontFamily = fallenContact.fontUrl
    ? getFontFamily(fallenContact.fontUrl)
    : undefined;

  return (
    <Link
      to={`/fallenCard/${fallenContact._id}`}
      className="fallen-card min-h-10rem flex flex-column align-items-center"
    >
      <h3 className="mb-0" style={fontFamily ? { fontFamily } : undefined}>
        {fallenContact.name}
      </h3>
      {fallenContact.thumbnail && (
        <img
          alt={`קווים לדמותו של ${fallenContact.name}`}
          src={`${
            prefix +
            fallenContact.thumbnail
              .slice(
                0,
                fallenContact.thumbnail.indexOf('mv2') +
                  (fallenContact.thumbnail.includes('jpeg') ? 8 : 7)
              )
              .replace('wix:image://v1/', '')
          }`}
          style={{ maxWidth: '250px' }}
        />
      )}
    </Link>
  );
}
