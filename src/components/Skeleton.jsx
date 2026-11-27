// Grey placeholder shown while content loads. Size it with className.
const Skeleton = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`bg-dark-850 shimmer-bg animate-pulse ${className}`}
  />
);

export default Skeleton;
