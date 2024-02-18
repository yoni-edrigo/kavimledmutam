import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { Helmet } from 'react-helmet-async';
import { prefix } from '../utils';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';
export default function AllFallen() {
  //@ts-expect-error wixdata isnt known
  const wixData: Contact[] = useLoaderData();
  console.log(wixData);
  const [filterText, setFilterText] = useState<string | undefined>();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  // Filtered data based on search text
  const filteredData = wixData.filter((f) =>
    filterText
      ? f.name.includes(filterText)
      : true && f.mediagallery && f.mediagallery.length > 0
  );

  // Total records for the Paginator should be the length of the filtered data
  const totalRecords = filteredData.length;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <div className="max-w-screen overflow-x-hidden px-8 py-5 mb-8">
      <Helmet prioritizeSeoTags>
        <title>קווים לדמותם | רשימת הנופלים</title>
        <meta
          name="description"
          content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
      </Helmet>
      <div className="py-1">
        <h3>הגיבורים שלנו</h3>
        <InputText
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="fallen-search-box"
          type="text"
          name="search"
          placeholder="חיפוש על פי שם / יחידה"
        />
      </div>
      <div
        className="grid grid-nogutter  gap-5 mt-3 justify-content-between"
        style={{ minHeight: '300px' }}
      >
        {filteredData &&
          filteredData
            .slice(first, first + rows)
            .map((fallenContact, index) => (
              <Link
                key={index}
                to={`/fallenCard/${fallenContact._id}`}
                className="fallen-card min-h-10rem flex flex-column align-items-center"
              >
                <h3 className="mb-0 ">{fallenContact.name}</h3>
                {fallenContact.mediagallery &&
                  fallenContact.mediagallery[0] && (
                    <img
                      alt={`קווים לדמותו של ${fallenContact.name}`}
                      src={`${
                        prefix +
                        fallenContact.mediagallery[0].src
                          .slice(
                            0,
                            fallenContact.mediagallery[0].src.indexOf('mv2') + 7
                          )
                          .replace('wix:image://v1/', '')
                      }`}
                      style={{ minWidth: '200px', maxHeight: '300px' }}
                    />
                  )}
              </Link>
            ))}
      </div>
      <div className="w-full">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={onPageChange}
          template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          pt={{ root: { className: 'text-primary', dir: 'ltr' } }}
        />
      </div>
    </div>
  );
}
