import { Link, useLoaderData } from 'react-router-dom';
import { Contact } from './root';
import { getMetaTags, prefix } from '../utils';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import plusIcon from '../assets/plusIcon.svg';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { CommentForm } from '../components/commentForm';
import autoAnimate from '@formkit/auto-animate';
import { getCommentsByFallenId } from '../loaders';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { SocialShare } from '../components/socialShare/socialShare';
import { ReadMore } from '../components/expandable-text';
export default function FallenPage() {
  //@ts-expect-error wixdata isnt known
  const fallenData: Contact = useLoaderData();
  console.log(fallenData);

  const [show, setShow] = useState(false);
  const [showImages, setShowImages] = useState(true);

  useEffect(() => {
    if (show) {
      setShowImages(window.innerWidth > 578);
    } else {
      setShowImages(true);
    }
  }, [show]);

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  const reveal = () => setShow(!show);

  return !fallenData ? (
    <>
      {'קישור לא תקין -> לחצו לחזרה לעמוד כל הנופלים'}
      <Link to={'/allFallen'} className="mr-3">
        {'כאן'}
      </Link>
    </>
  ) : (
    <div>
      {fallenData && getMetaTags(fallenData)}
      <section id="fallen-data" className="sm:mt-5">
        <h2 className="my-0 px-3 lg:px-0">
          {fallenData.name}
          {fallenData.isFemale ? ' - קווים לדמותה' : ' - קווים לדמותו'}
        </h2>
        <article
          className={`flex px-4 md:px-0 gap-4 lg:justify-content-between justify-content-center mt-0 ${
            fallenData.story
              ? 'flex-wrap align-items-start'
              : 'flex-wrap-reverse align-items-end'
          }`}
        >
          <div className="w-fit flex flex-column gap-3 mt-3 justify-content-between">
            {fallenData.story ? (
              <ReadMore text={fallenData.story} />
            ) : (
              <div className="z-3 lg:max-w-30rem">
                <CommentsSection fallenId={fallenData._id} />
              </div>
            )}
            <div className="flex flex-wrap gap-5 align-items-center">
              <div className="relative">
                <Button
                  className="write-more-btn w-fit flex flex-row-reverse gap-2 relative z-2 white-space-nowrap"
                  label="השארת תגובה"
                  onClick={(e) => {
                    e.stopPropagation();
                    reveal();
                  }}
                  icon={() => (
                    <img src={plusIcon} onClick={(e) => e.stopPropagation()} />
                  )}
                  pt={{
                    icon: { style: { color: 'var(--kavim-text)' } },
                    root: { style: { position: 'relative', zIndex: 2 } },
                  }}
                  style={{ justifySelf: 'start', alignSelf: 'start' }}
                />
              </div>
              <span className="mx-3 sm:m-0">
                <SocialShare
                  fallenName={fallenData.name}
                  shareUrl={window.location.href}
                />
              </span>
            </div>
          </div>
          {showImages && (
            <div
              className="md:max-w-30rem w-fit relative "
              style={{ maxWidth: '80vw' }}
            >
              <Swiper
                pagination={{
                  type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                autoHeight={true}
                centeredSlides
              >
                {fallenData.mediagallery &&
                  fallenData.mediagallery.map((media, index) => (
                    <SwiperSlide
                      key={index}
                      style={{ display: 'flex', placeContent: 'center' }}
                    >
                      <figure>
                        <img
                          alt={`התמונה של: ${fallenData.name}`}
                          src={`${
                            prefix +
                            media.src
                              .slice(
                                0,
                                media.src.indexOf('mv2') +
                                  +(media.src.includes('jpeg') ? 8 : 7)
                              )
                              .replace('wix:image://v1/', '')
                          }`}
                          style={{
                            width:
                              window.innerWidth < 900
                                ? window.innerWidth < 768
                                  ? '80vw'
                                  : '350px'
                                : '450px',
                          }}
                        />
                        {media.painter && (
                          <figcaption className="text-sm md:text-base text-center font-semibold">{`מאיירת: ${media.painter}`}</figcaption>
                        )}
                      </figure>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </article>
      </section>
      <div
        className="flex flex-column gap-5 px-3 md:px-8 mb-8 mt-5"
        ref={parent}
      >
        {show && <CommentForm fallenId={fallenData._id} hide={reveal} />}
        {fallenData.story && <CommentsSection fallenId={fallenData._id} />}
      </div>
    </div>
  );
}

type Comment = {
  fName: string;
  lName: string;
  phone: string;
  _createdDate: string;
  comment: string;
  isPinned: boolean;
};
function CommentsSection({ fallenId }: { fallenId: string }) {
  const [commentsArr, setCommentsArr] = useState<Comment[]>();
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);

  useEffect(() => {
    getCommentsByFallenId(fallenId)
      .then((data) => {
        setCommentsArr(data);
        console.log('fetched comments', data);
      })
      .catch((err) => console.error('error fetching comments', err));
  }, [fallenId]);
  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  return (
    <>
      <div className="comments-section z-1 mt-5">
        {commentsArr && commentsArr.length > 0 ? (
          commentsArr
            .sort((a, b): number => {
              // Handle the case where myBoolean is undefined
              const aValue = a.isPinned !== undefined ? a.isPinned : false;
              const bValue = b.isPinned !== undefined ? b.isPinned : false;

              // Compare boolean values
              if (aValue > bValue) {
                return -1;
              }
              if (aValue < bValue) {
                return 1;
              }
              return 0;
            })
            .map((comment, index) => (
              <div className="comment-wrapper px-2" key={index}>
                <div
                  className="comment pt-5 md:px-6 pb-7 gap-3"
                  key={index}
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
                      {comment.fName}
                      {` `}
                      {comment.lName}
                    </h3>
                    <span>
                      <a href={`tel:${comment.phone}`}>
                        <h3>{comment.phone}</h3>
                      </a>
                    </span>
                    <h3>
                      {new Date(comment._createdDate).toLocaleDateString(
                        'he-IL'
                      )}
                    </h3>
                  </div>
                  <p
                    className="text-right sm:text-start w-full"
                    style={{
                      maxWidth: window.innerWidth < 300 ? '15ch' : '',
                      gridColumn: '1/-1',
                    }}
                  >
                    {comment.comment}
                  </p>
                </div>
                <div
                  style={{
                    gridArea: 'seperator',
                    height: '2px',
                    backgroundColor: 'white',
                  }}
                ></div>
              </div>
            ))
        ) : (
          <div className="px-7 pt-5">
            <p>היו הראשונים להשאיר סיפור</p>
          </div>
        )}
      </div>
      {commentsArr && (
        <div className="w-full mb-7">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={commentsArr.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
            template={
              window.innerWidth < 500
                ? 'FirstPageLink PrevPageLink NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                : 'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink'
            }
            pt={{ root: { className: 'text-primary', dir: 'ltr' } }}
          />
        </div>
      )}
    </>
  );
}
