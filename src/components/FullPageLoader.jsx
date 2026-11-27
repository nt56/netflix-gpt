const FullPageLoader = () => (
  <div
    role="status"
    className="min-h-screen w-full flex items-center justify-center bg-dark-950"
  >
    <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading</span>
  </div>
);

export default FullPageLoader;
