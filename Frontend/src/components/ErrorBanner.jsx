// FRONTEND/src/components/ErrorBanner.jsx
const ErrorBanner = ({ message, onRetry }) => {
  if (!message) return null;
  return (
    <div className="bg-red-100 text-red-800 p-3 text-center">
      {message}
      {onRetry && <button onClick={onRetry} className="ml-2 underline">Retry</button>}
    </div>
  );
};

export default ErrorBanner;
