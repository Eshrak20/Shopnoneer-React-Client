import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary Caught an Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Something Went Wrong!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We're sorry for the inconvenience. Please try again later or contact
            support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
