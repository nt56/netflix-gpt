import ErrorScreen, { ERROR_ACTION_CLASS } from "./ErrorScreen";

// Shown when a page throws while rendering
const CrashScreen = () => (
  <ErrorScreen
    title="Something went wrong"
    message="The page could not be shown. Reload to try again."
  >
    {/* a full load, so the app starts again with clean state */}
    <button
      type="button"
      onClick={() => window.location.assign("/")}
      className={ERROR_ACTION_CLASS}
    >
      Reload Flixora
    </button>
  </ErrorScreen>
);

export default CrashScreen;
