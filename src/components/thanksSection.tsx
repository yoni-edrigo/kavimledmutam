import { Volunteer } from '../routes/landing';

export function ThanksSection({ volunteerArr }: { volunteerArr: Volunteer[] }) {
  return (
    <div className="thanks-section p-5 flex flex-column">
      <h2>תודות</h2>
      <div
        className="flex flex-wrap gap-7 p-5 justify-content-around align-self-center"
        style={{ maxWidth: '1000px' }}
      >
        {volunteerArr &&
          volunteerArr.map((volunteer, index) => (
            <div
              key={index}
              className="flex flex-column align-items-center gap-2"
            >
              <img
                src={volunteer.image}
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'var(--kavim-blue)',
                  borderRadius: '50%',
                }}
              />
              <h3>{volunteer.name}</h3>
              <a
                href={volunteer.link}
                style={{ fontFamily: `'Rubik', serif`, fontSize: '16px' }}
              >
                {volunteer.role}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
