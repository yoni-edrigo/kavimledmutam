import { Contact } from '../routes/root';

export function Staff({ staffData }: { staffData: Contact[] }) {
  return (
    <div className="w-full flex gap-2 text-sm">
      <span>נבנה בהתנדבות על ידי: </span>
      {staffData &&
        staffData.map((staffer, index) => (
          <span key={index}>{staffer.name}</span>
        ))}
    </div>
  );
}
