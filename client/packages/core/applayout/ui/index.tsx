import './style.scss';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <article className="applayout">
      <Outlet />
    </article>
  );
};
