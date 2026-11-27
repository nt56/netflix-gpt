import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import ErrorScreen, { ERROR_ACTION_CLASS } from "./ErrorScreen";

const NotFoundPage = () => (
  <ErrorScreen
    code="404"
    title="Lost Your Way in Cinema?"
    message="Sorry, we couldn't find the page you're looking for. Let's get you back to Flixora."
  >
    <Link to="/" className={ERROR_ACTION_CLASS}>
      <FaHome className="text-base" />
      <span>Back to Flixora</span>
    </Link>
  </ErrorScreen>
);

export default NotFoundPage;
