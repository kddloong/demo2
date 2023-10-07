import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // initialize the error state
    this.state = { hasError: false };
  }

  // if an error happened, set the state to true
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    // if error happened, return a fallback component
    if (this.state.hasError) {
      console.log(`dsd`);

      return <>Oh no! Epic fail!</>;
    }

    return this.props.children;
  }
}
