import { Component, ErrorInfo, ReactNode } from "react";
import Errorpage from "./pages/Errorpage";

interface Props {
  children: ReactNode; // Define children prop type
}

interface State {
  hasError: boolean; // Define state type
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }; // Return new state
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Errorpage />;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
