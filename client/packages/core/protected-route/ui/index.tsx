import "./style.scss";
import { Navigate, Outlet } from "react-router-dom";
import { useData } from "../data";

export const ProtectedRoute = () => {
  const { isValidToken } = useData();

  if (isValidToken === undefined) {
    return null;
  }
  return (
    <article className="protected-route">
      {isValidToken ? <Outlet /> : <Navigate to="/admin" />}
    </article>
  );
};
