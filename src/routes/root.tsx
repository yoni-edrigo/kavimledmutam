import { Outlet, NavLink } from 'react-router-dom';
export type Contact = {
  _id: string;
  name: string;
  mediagallery?: {
    description: string;
    slug: string;
    alt: string;
    src: string;
    title: string;
    type: string;
    settings: {
      width: number;
      height: number;
      focalPoint: [number, number];
    };
  }[];
  story?: string;
};

export function Root() {
  //   const wixData: Contact[][] = useLoaderData();

  return (
    <div className="relative">
      <div className="nav-bar flex justify-content-between p-3">
        <span className="flex gap-3 align-items-center">
          <NavLink
            to={`/`}
            className={({ isActive, isPending }) =>
              isActive ? 'activeLink' : isPending ? 'pendingLink' : ''
            }
          >
            <h3 className="m-0">קווים לדמותם</h3>
          </NavLink>
          <NavLink
            to={`allFallen`}
            className={({ isActive, isPending }) =>
              isActive ? 'activeLink' : isPending ? 'pendingLink' : ''
            }
          >
            כל הנופלים
          </NavLink>
        </span>
        <span>search</span>
      </div>
      <div className="page-content px-3">
        <Outlet />
      </div>
    </div>
  );
}
