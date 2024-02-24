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
import fallenPageTopElement from '../assets/fallenPageTopElement.svg';
import { SocialShare } from '../components/socialShare/socialShare';
export default function FallenPage() {
  //@ts-expect-error wixdata isnt known
  const fallenData: Contact = useLoaderData();
  console.log(fallenData);

  const [show, setShow] = useState(false);
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
    <>
      {fallenData && getMetaTags(fallenData)}
      <div className="page-grid pt-5 mb-8 overflow-hidden">
        <div
          className="fallen-hero-section gap-4 my-5 align-items-start"
          style={{ gridArea: 'centerContent' }}
        >
          <h2 className="my-0" style={{ gridArea: 'name' }}>
            {fallenData.name}
            {fallenData.isFemale ? ' - קווים לדמותה' : ' - קווים לדמותו'}
          </h2>
          <div
            className="w-full flex flex-column gap-5"
            style={{ gridArea: 'content' }}
          >
            {fallenData.story ? (
              <p className="text-justify z-3" style={{ maxWidth: '50ch' }}>
                {fallenData.story}
              </p>
            ) : (
              <div className="z-3">
                <CommentsSection fallenId={fallenData._id} />
              </div>
            )}
            <div className="flex flex-row gap-5 align-items-center">
              <Button
                className="write-more-btn w-fit flex flex-row-reverse gap-2 relative z-0 white-space-nowrap"
                // size="small"
                label="לכתיבה נוספת"
                onClick={reveal}
                icon={() => <img src={plusIcon} />}
                pt={{ icon: { style: { color: 'var(--kavim-text)' } } }}
                style={{ justifySelf: 'start', alignSelf: 'start' }}
              >
                <img
                  src={fallenPageTopElement}
                  className="absolute"
                  style={{ top: '-470px', left: '-1120px', scale: '0.9' }}
                />
              </Button>
              <SocialShare
                fallenName={fallenData.name}
                shareUrl={window.location.href}
              />
            </div>
          </div>
          <div
            style={{
              width: window.innerWidth < 900 ? '350px' : '450px',
              gridArea: 'imageSlider',
              justifySelf: 'center',
            }}
          >
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              autoHeight={true}
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
                            .slice(0, media.src.indexOf('mv2') + 7)
                            .replace('wix:image://v1/', '')
                        }`}
                        style={{
                          width: window.innerWidth < 900 ? '350px' : '450px',
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
        </div>
        <div
          className="flex flex-column gap-5 px-3 md:px-8 mb-8"
          style={{ gridArea: 'centerContent2' }}
          ref={parent}
        >
          {show && <CommentForm fallenId={fallenData._id} hide={reveal} />}
          {fallenData.story && <CommentsSection fallenId={fallenData._id} />}
        </div>
      </div>
    </>
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
      <div className="comments-section z-1">
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
                <div className="comment pt-5 px-6 pb-7 gap-3" key={index}>
                  <h3 style={{ gridArea: 'name' }}>
                    {comment.fName}
                    {` `}
                    {comment.lName}
                  </h3>
                  {comment.phone && (
                    <a href={`tel:${comment.phone}`}>
                      <h3 style={{ gridArea: 'phone' }}>{comment.phone}</h3>
                    </a>
                  )}
                  <h3 style={{ gridArea: 'date' }}>
                    {new Date(comment._createdDate).toLocaleDateString('he-IL')}
                  </h3>
                  <p style={{ gridArea: 'comment' }}>{comment.comment}</p>
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
        <div className="w-full">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={commentsArr.length}
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
