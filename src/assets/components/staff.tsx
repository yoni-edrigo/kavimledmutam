// import { removeUnusedDataFromUrl } from "../../utils";
// const imageRadius = "120px";
type staffType = { name: string; image: string };
export function Staff({ staffData }: { staffData: staffType[] }) {
  return (
    <div className="w-full">
      <h1 className="rubik-dirt">צוות המתנדבים</h1>
      <p>lorem ipsum</p>
      <div className="flex flex-wrap md:px-7 mt-7 gap-5 ">
        {staffData &&
          staffData.map((staffer, index) => (
            <div
              key={index}
              className="flex flex-column align-items-center gap-3 w-10rem"
            >
        {staffer.name}
              {/* <figure className="c4-izmir c4-border-corners-2 c4-gradient-top">
                <img
                  src={removeUnusedDataFromUrl(staffer.image)}
                  alt="תמונת צוות"
                />
                <figcaption>
                  <div className="c4-fade-up">
                      <h3>{staffer.name}</h3>
                  </div>
                </figcaption>
              </figure> */}
            </div>
          ))}
      </div>
    </div>
  );
}
