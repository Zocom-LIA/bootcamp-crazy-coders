import './style.scss';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <main className="applayout">
      <Outlet />
    </main>
  );
};
