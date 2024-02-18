import { Volunteer } from '../routes/landing';
import { prefix } from '../utils';

export function ThanksSection({ volunteerArr }: { volunteerArr: Volunteer[] }) {
  return (
    <div className="thanks-section p-5 flex flex-column pb-7">
      <h2>תודות</h2>
      <div className="volunteer-grid md:gap-7 md:p-5 justify-content-around align-self-center">
        {volunteerArr &&
          volunteerArr
            .sort((a, b) => {
              const orderA = a.order || 0; // Use 0 if 'order' is undefined or null
              const orderB = b.order || 0; // Use 0 if 'order' is undefined or null
              return orderB - orderA;
            })
            .map((volunteer, index) => (
              <div
                key={index}
                className="flex flex-column align-items-center gap-2"
              >
                {volunteer.image ? (
                  <img
                    src={
                      prefix +
                      volunteer.image
                        .slice(0, volunteer.image.indexOf('mv2') + 7)
                        .replace('wix:image://v1/', '')
                    }
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: 'var(--kavim-blue)',
                      borderRadius: '50%',
                    }}
                    alt={`תמונתו של ${volunteer.name}`}
                  />
                ) : (
                  <span
                    className="pi pi-user text-3xl"
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: 'var(--kavim-blue)',
                      borderRadius: '50%',
                      display: 'flex',
                      placeContent: 'center',
                      placeItems: 'center',
                    }}
                  ></span>
                )}
                <h3>{volunteer.name}</h3>
                {volunteer.link ? (
                  <a
                    href={volunteer.link}
                    style={{
                      color: volunteer.isPainter ? 'var(--kavim-darkblue)' : '',
                      fontFamily: `'Rubik', serif`,
                      fontSize: '16px',
                    }}
                    target="_blank"
                  >
                    <span className="flex gap-1 align-items-center">
                      <i className="pi pi-link" />
                      {volunteer.role}
                    </span>
                  </a>
                ) : (
                  <span
                    className="flex gap-1 align-items-center"
                    style={{
                      color: volunteer.isPainter ? 'var(--kavim-darkblue)' : '',
                      fontFamily: `'Rubik', serif`,
                      fontSize: '16px',
                    }}
                  >
                    {volunteer.link && <i className="pi pi-link" />}
                    {volunteer.role}
                  </span>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
