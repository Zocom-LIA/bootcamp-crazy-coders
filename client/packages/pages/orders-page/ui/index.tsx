import './style.scss';
import { Orders } from '@zocom/orders';
import Logo from './assets/logo.svg';

export const OrdersPage = () => {
  return (
    <main className="orders-page">
      <section className="orders-page__content">
        <header>
          <img src={Logo} alt="Logo for Yum Yum Gimmi Sum" />
          <h1>Kitchen View</h1>
        </header>

        <Orders />
      </section>
    </main>
  );
};
