import "./style.scss";
import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../data";
import { ProgressBar } from "@zocom/progress-bar";

export const ProtectedRoute = () => {
  const { isValidToken } = useData();

  if (isValidToken === undefined) {
    return <ProgressBar />;
  }
  return (
    <article className="protected-route">
      {isValidToken ? <Outlet /> : <Navigate to="/admin" />}
    </article>
  );
};
