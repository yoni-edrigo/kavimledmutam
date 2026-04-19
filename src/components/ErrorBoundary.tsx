import React from 'react';
import { Link } from 'react-router-dom';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-column align-items-center justify-content-center gap-4"
          style={{ minHeight: '50svh' }}
        >
          <h2>משהו השתבש</h2>
          <p>אירעה שגיאה בלתי צפויה. אנא נסו שוב.</p>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false })}
            className="write-more-btn px-4 py-2"
          >
            חזרה לדף הבית
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
