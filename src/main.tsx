import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './routes/root';
import { ErrorPage } from './error-page';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import AllFallen from './routes/allFallen';
import Landing from './routes/landing';
import { allFallenLoader, fallenContactLoader, rootLoader } from './loaders';
import FallenPage from './routes/fallenPage';
import { HelmetProvider } from 'react-helmet-async';
import { addLocale, locale } from 'primereact/api';
import { he } from './he.json';
import { ContactForm } from './routes/contactForm';
addLocale('he', he);
locale('he');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      { index: true, element: <Landing />, loader: rootLoader },
      {
        path: 'allFallen/',
        element: <AllFallen />,
        loader: allFallenLoader,
      },
      {
        path: 'contactUs/',
        element: <ContactForm />,
        // loader: allFallenLoader,
      },
      {
        path: 'fallenCard/:contactId',
        element: <FallenPage />,
        loader: fallenContactLoader,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
