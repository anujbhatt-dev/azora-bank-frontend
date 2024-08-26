import { useRouteError } from "react-router-dom";

export default function Page404() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page h-[100vh] flex justify-center items-center flex-col">
      <h1 className="text-[3rem] font-bold m-4">Oops!</h1>
      <p className="text-blue-950 m-4">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}