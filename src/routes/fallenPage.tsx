import { Link, useLoaderData } from 'react-router-dom';
import { Contact, Comment } from '../types';
import { getMetaTags } from '../utils';
import { InputSwitch } from 'primereact/inputswitch';
import { injectFont, getFontFamily } from '../fontUtils';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import plusIcon from '../assets/plusIcon.svg';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { CommentForm } from '../components/commentForm';
import autoAnimate from '@formkit/auto-animate';
import { SocialShare } from '../components/socialShare/socialShare';
import { ReadMore } from '../components/expandable-text';
import { ImageCarousel } from '../components/ImageCarousel';

export default function FallenPage() {
  const { fallen: fallenData, comments } = useLoaderData() as {
    fallen: Contact;
    comments: Comment[];
  };

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [useCustomFont, setUseCustomFont] = useState(true);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    formRef.current && autoAnimate(formRef.current);
  }, [formRef]);

  useEffect(() => {
    if (fallenData?.fontUrl) injectFont(fallenData.fontUrl);
  }, [fallenData?.fontUrl]);

  const customFontFamily =
    fallenData?.fontUrl && useCustomFont
      ? getFontFamily(fallenData.fontUrl)
      : undefined;

  const fontStyle = customFontFamily
    ? { fontFamily: customFontFamily }
    : undefined;

  if (!fallenData) {
    return (
      <>
        {'קישור לא תקין -> לחצו לחזרה לעמוד כל הנופלים'}
        <Link to={'/allFallen'} className="mr-3">
          {'כאן'}
        </Link>
      </>
    );
  }

  return (
    <div className="fallen-page">
      {getMetaTags(fallenData)}

      {/* ── Header: name + font controls ── */}
      <header className="fallen-page__header px-3 lg:px-0 sm:mt-5">
        <h2 className="my-0" style={fontStyle}>
          {fallenData.name}
          {fallenData.isFemale ? ' - קווים לדמותה' : ' - קווים לדמותו'}
        </h2>

        {fallenData.fontUrl && (
          <div className="flex align-items-center gap-3 flex-wrap mt-2">
            <div className="flex align-items-center gap-2">
              <InputSwitch
                checked={useCustomFont}
                onChange={(e) => setUseCustomFont(!!e.value)}
                inputId="fontToggle"
              />
              <label
                htmlFor="fontToggle"
                className="text-sm cursor-pointer"
              >
                {useCustomFont ? 'הצגה בגופן האישי' : 'הצגה בגופן רגיל'}
              </label>
            </div>
            {useCustomFont && (
              <a
                href="https://www.ot-hayim.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm"
                style={{ color: 'var(--kavim-darkblue)' }}
              >
                גופן בעיצוב: אות חיים ↗
              </a>
            )}
          </div>
        )}
      </header>

      {/* ── Two-column body: story | gallery ── */}
      <div className="fallen-page__body px-3 md:px-0 mt-3">
        {/* Story column */}
        <div className="fallen-page__story" style={fontStyle}>
          {fallenData.story ? (
            <ReadMore text={fallenData.story} />
          ) : (
            <p className="text-sm" style={{ color: 'var(--kavim-darkgrey)', opacity: 0.6 }}>
              סיפורו של {fallenData.name} טרם נוסף
            </p>
          )}

          <div className="flex flex-wrap gap-5 align-items-center mt-4">
            <Button
              className="write-more-btn w-fit flex flex-row-reverse gap-2 white-space-nowrap"
              label="השארת תגובה"
              onClick={() => setShowCommentForm((v) => !v)}
              icon={() => <img src={plusIcon} />}
              pt={{
                icon: { style: { color: 'var(--kavim-text)' } },
              }}
            />
            <SocialShare
              fallenName={fallenData.name}
              shareUrl={window.location.href}
            />
          </div>
        </div>

        {/* Gallery column */}
        {fallenData.mediagallery && fallenData.mediagallery.length > 0 && (
          <div className="fallen-page__gallery">
            <ImageCarousel
              slides={fallenData.mediagallery}
              altPrefix={`איור של ${fallenData.name}`}
            />
          </div>
        )}
      </div>

      {/* ── Comments (always at bottom) ── */}
      <div className="px-3 md:px-8 mb-8 mt-6" ref={formRef}>
        {showCommentForm && (
          <CommentForm
            fallenId={fallenData._id}
            hide={() => setShowCommentForm(false)}
          />
        )}
        <CommentsSection initialComments={comments} />
      </div>
    </div>
  );
}

function CommentsSection({ initialComments }: { initialComments: Comment[] }) {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const sorted = [...initialComments].sort((a, b) => {
    const aPin = a.isPinned ?? false;
    const bPin = b.isPinned ?? false;
    return aPin === bPin ? 0 : aPin ? -1 : 1;
  });

  const onPageChange = (e: PaginatorPageChangeEvent) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  return (
    <>
      <div className="comments-section z-1 mt-5">
        {sorted.length > 0 ? (
          sorted.slice(first, first + rows).map((comment, index) => (
            <div className="comment-wrapper px-2" key={index}>
              <div
                className="comment pt-5 md:px-6 pb-7 gap-3"
                style={{
                  minHeight: '200px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3,1fr)',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'subgrid',
                    gridColumn: '1/-1',
                  }}
                >
                  <h3>
                    {comment.fName} {comment.lName}
                  </h3>
                  <span>
                    <a href={`tel:${comment.phone}`}>
                      <h3>{comment.phone}</h3>
                    </a>
                  </span>
                  <h3>
                    {new Date(comment._createdDate).toLocaleDateString('he-IL')}
                  </h3>
                </div>
                <p
                  className="text-right sm:text-start w-full"
                  style={{ gridColumn: '1/-1' }}
                >
                  {comment.comment}
                </p>
              </div>
              <div style={{ height: '2px', backgroundColor: 'white' }} />
            </div>
          ))
        ) : (
          <div className="px-7 pt-5">
            <p>היו הראשונים להשאיר סיפור</p>
          </div>
        )}
      </div>

      {sorted.length > rows && (
        <div className="w-full mb-7">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={sorted.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
            template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            pt={{ root: { className: 'text-primary', dir: 'ltr' } }}
          />
        </div>
      )}
    </>
  );
}
