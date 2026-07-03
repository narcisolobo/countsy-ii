import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return (
        fallback ?? (
          <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
            <h1 className="text-error mb-4 text-2xl font-bold">
              Something went wrong.
            </h1>
            <p className="text-base-content/70 text-base">
              {error?.message || "Please refresh the page or try again later."}
            </p>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
