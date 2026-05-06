import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-white">
          <section className="glass max-w-md rounded-3xl p-8 text-center">
            <h1 className="text-2xl font-bold">The interface hit an unexpected error.</h1>
            <p className="mt-3 text-sm text-white/68">Refresh the page to start a clean chat surface.</p>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
