import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col gap-2 justify-center items-center text-center bg-slate-500 h-[100vh] w-auto font-extrabold">
      <h1>{err.status}</h1>
      <h2>{err.statusText}</h2>
      <h3 className="p-2 bg-orange-600 rounded-md">
        <Link to="/">Back Home</Link>
      </h3>
    </div>
  );
};

export default Error;
