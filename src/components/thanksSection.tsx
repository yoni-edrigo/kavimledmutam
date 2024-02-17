const tempArr = Array(10)
  .fill(null)
  .map((_, index) => index);
export function ThanksSection() {
  return (
    <div className="thanks-section p-3 flex flex-column">
      thanks
      <div
        className="flex flex-wrap gap-7 p-5 justify-content-around align-self-center"
        style={{ maxWidth: '1000px' }}
      >
        {tempArr.map((volunteer, index) => (
          <div key={index} className="flex flex-column align-items-center">
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--kavim-blue)',
                borderRadius: '50%',
              }}
            ></div>
            <h3>{volunteer}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
