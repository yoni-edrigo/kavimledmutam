import { useLoaderData } from 'react-router-dom';
import { Contact } from '../types';
import { Helmet } from 'react-helmet-async';
import { FallenCard } from '../components/FallenCard';
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';
import { AnimatedGridOnScroll } from '../components/animate-wrapper';
import { Checkbox } from 'primereact/checkbox';

export default function AllFallen() {
  const wixData = useLoaderData() as Contact[];
  const [filterText, setFilterText] = useState<string | undefined>();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(30);
  const [showWithStory, setShowWithStory] = useState<boolean>(); // New state for checkbox

  // Filtered data based on search text and checkbox
  const filteredData = wixData.filter((f) => {
    const matchesFilterText = filterText ? f.name.includes(filterText) : true;
    const matchesStoryFilter = showWithStory ? !!f.story : true;
    return matchesFilterText && matchesStoryFilter;
  });

  // Total records for the Paginator should be the length of the filtered data
  const totalRecords = filteredData.length;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <div>
      <Helmet prioritizeSeoTags>
        <title>קווים לדמותם | רשימת הנופלים</title>
        <meta
          name="description"
          content="קווים לדמותם״ הינו מיזם הנצחה התנדבותי אשר קם במטרה לספר את סיפוריהם של נופלי מלחמת חרבות ברזל, אזרחים וחיילים כאחד, דרך איורים ומילים. כל האיורים נעשים בעבודת יד ונשלחים כתרומה למשפחות וכן המילים נכתבות בשיתוף המשפחה. האתר הוקם כמקום בו תוכלו להכיר, ללמוד ולשאוב השראה, מהגיבורים הראשיים שכבר אינם אך סיפורם יחיה לעד. אנו מזמינים אתכם ללמוד ולהכיר את טובי בנינו ובנותינו, קצת על מי שהיו וקצת על מה שהשאירו אחריהם - דרך דמותם היפה בקווים ודרך הסיפורים."
        />
      </Helmet>
      <div className="flex flex-wrap align-items-end w-full gap-3 my-7">
        <div
          className="px-3 lg:px-0"
          style={{ gridArea: 'centerContent', justifySelf: 'start' }}
        >
          <h3>הגיבורים שלנו</h3>
          <InputText
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="fallen-search-box mt-2"
            type="text"
            name="search"
            placeholder="חיפוש על פי שם / יחידה"
          />
        </div>
        <div className="flex align-items-center justify-content-center gap-2 px-3 lg:px-0">
          <Checkbox
            type="checkbox"
            id="showWithStory"
            checked={!!showWithStory}
            onChange={(e) => setShowWithStory(!!e.checked)}
          />
          <label htmlFor="showWithStory" className="ml-2">
            סינון נופלים ללא סיפור
          </label>
        </div>
      </div>
      <div
        className="md:px-7"
        style={{
          gridArea: 'centerContent2',
          justifySelf: 'center',
          marginBottom: '9rem',
        }}
      >
        <div
          className="grid grid-nogutter  md:gap-5 mt-3 md:justify-content-between justify-content-center"
          style={{ minHeight: '300px' }}
        >
          {filteredData &&
            filteredData
              .slice(first, first + rows)
              .map((fallenContact, index) => (
                <AnimatedGridOnScroll key={index} index={index}>
                  <FallenCard fallenContact={fallenContact} />
                </AnimatedGridOnScroll>
              ))}
        </div>
        <div className="w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            rowsPerPageOptions={[30, 50, 80]}
            onPageChange={onPageChange}
            template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            pt={{ root: { className: 'text-primary', dir: 'ltr' } }}
          />
        </div>
      </div>
    </div>
  );
}
