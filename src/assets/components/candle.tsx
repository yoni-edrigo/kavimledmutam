export function Candle({ isLit }: { isLit: boolean }) {
  return (
    <div className="holder">
      <div className="candle">
        <div className="thread"></div>
        {isLit && (
          <>
            <div className="blinking-glow"></div>
            <div className="glow"></div>
            <div className="flame"></div>
          </>
        )}
      </div>
    </div>
  );
}
