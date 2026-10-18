import React from 'react';

interface Props {
  name: string;
  children: React.ReactNode;
}

interface State {
  error: Error | null;
}

/** Keeps a failing quan from taking the quanar down with it. */
export class QuanErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <p className="qa-error">{this.props.name} failed: {this.state.error.message}</p>;
    }
    return this.props.children;
  }
}
