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
import { Pagination } from 'swiper/modules';
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
      <div
        className="mt-3 flex flex-column pb-3 px-3 md:px-8 pt-5 mb-8 gap-5"
        ref={parent}
      >
        <div className="flex flex-column-reverse md:flex-row gap-4 justify-content-between">
          <div style={{ display: 'grid', gridTemplateRows: 'min-content' }}>
            <h2 className="my-0">
              {fallenData.name}
              {' - קווים לדמותו'}
            </h2>
            <p className="text-justify" style={{ maxWidth: '50ch' }}>
              {fallenData.story}
            </p>{' '}
            <Button
              className="write-more-btn w-fit flex flex-row-reverse gap-2"
              size="small"
              label="לכתיבה נוספת"
              onClick={reveal}
              icon={() => <img src={plusIcon} />}
              pt={{ icon: { style: { color: 'var(--kavim-text)' } } }}
              style={{ justifySelf: 'start', alignSelf: 'start' }}
            />
          </div>
          <div style={{ maxWidth: '450px' }}>
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              modules={[Pagination]}
            >
              {fallenData.mediagallery &&
                fallenData.mediagallery.map((media, index) => (
                  <SwiperSlide key={index}>
                    <img
                      alt={`התמונה של: ${fallenData.name}`}
                      src={`${prefix + media.slug}`}
                      style={{
                        maxWidth: '400px',
                      }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
        {show && <CommentForm fallenId={fallenData._id} />}
        {/* FIXME: add real data */}
        <CommentsSection fallenId={fallenData._id} />
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
      <div className="comments-section">
        {commentsArr && commentsArr.length > 0 ? (
          commentsArr.map((comment, index) => (
            <div className="comment-wrapper px-2">
              <div className="comment pt-5 px-6 pb-7" key={index}>
                <h3 style={{ gridArea: 'name' }}>
                  {comment.fName}
                  {` `}
                  {comment.lName}
                </h3>
                <h3
                  style={{
                    gridArea: 'phone',
                    direction: 'ltr',
                    textAlign: 'end',
                  }}
                >
                  {comment.phone}
                </h3>
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
