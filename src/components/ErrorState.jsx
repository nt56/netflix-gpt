// Message for content that failed to load, with an optional retry button
const ErrorState = ({ message, onRetry }) => (
  <div
    role="alert"
    className="w-full max-w-md mx-auto p-6 rounded-2xl bg-red-950/70 border border-red-500/40 text-center"
  >
    <p className="text-red-300 font-bold text-sm">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 px-5 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-xs shadow-glow"
      >
        Try again
      </button>
    )}
  </div>
);

export default ErrorState;
