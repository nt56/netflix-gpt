import { Component } from "react";
import CrashScreen from "./CrashScreen";

// Catches render errors outside the router. Error boundaries must be classes.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  render() {
    return this.state.hasError ? <CrashScreen /> : this.props.children;
  }
}

export default ErrorBoundary;
