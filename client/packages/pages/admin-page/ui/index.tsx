import './style.scss';
import Logo from './assets/logo.svg';
import { LoginForm } from '@zocom/login-form';
export const AdminPage = () => {
  return (
    <main className="admin-page">
      <header className="admin-page__header">
        <img src={Logo} alt="Logo for Yum Yum Gimmi Sum" />
      </header>
      <LoginForm />
    </main>
  );
};
