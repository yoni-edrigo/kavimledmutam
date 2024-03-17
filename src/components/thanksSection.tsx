import { Volunteer } from '../routes/landing';
import { prefix } from '../utils';
import { AnimatedGridOnScroll } from './animate-wrapper';
export function ThanksSection({ volunteerArr }: { volunteerArr: Volunteer[] }) {
  return (
    <div
      className="page-grid thanks-section"
      style={{
        paddingBottom: '150px',
        background: `linear-gradient(180deg, #E7F1FB 0%, rgba(231, 241, 251, 0) 100%)`,
      }}
    >
      <h2 className="mt-5 mb-7" style={{ gridArea: 'centerContent' }}>
        תודות
      </h2>
      <div
        className="volunteer-grid gap-3 md:gap-5 justify-content-between align-items-start"
        style={{ gridArea: 'centerContent2', justifySelf: 'center' }}
      >
        {volunteerArr &&
          volunteerArr
            .sort((a, b) => {
              const orderA = a.order || 0; // Use 0 if 'order' is undefined or null
              const orderB = b.order || 0; // Use 0 if 'order' is undefined or null
              return orderA - orderB;
            })
            .map((volunteer, index) => (
              <AnimatedGridOnScroll key={index} index={index}>
                <div
                  key={index}
                  className="flex flex-column align-items-center gap-2"
                >
                  {volunteer.image ? (
                    <img
                      src={
                        prefix +
                        volunteer.image
                          .slice(
                            0,
                            volunteer.image.indexOf('mv2') +
                              (volunteer.image.includes('jpeg') ? 8 : 7)
                          )
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
                        color: volunteer.isPainter
                          ? 'var(--kavim-darkblue)'
                          : '',
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
                        color: volunteer.isPainter
                          ? 'var(--kavim-darkblue)'
                          : '',
                        fontSize: '16px',
                      }}
                    >
                      {volunteer.link && <i className="pi pi-link" />}
                      {volunteer.role}
                    </span>
                  )}
                </div>
              </AnimatedGridOnScroll>
            ))}
      </div>
    </div>
  );
}
