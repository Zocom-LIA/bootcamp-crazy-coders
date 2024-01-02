import './style.scss';
import { Orders } from '@zocom/orders';
import Logo from '../assets/logo.svg';

// Testdata
const items = [
  {
    product: 'Karlstad',
    quantity: 3,
    total: 27,
  },
  {
    product: 'Ho Chi Minh',
    quantity: 2,
    total: 18,
  },
  {
    product: 'Kingston',
    quantity: 1,
    total: 9,
  },
];

const orders = [
  { id: '4kjwsdf234k', done: false, items },
  { id: '4kjwsdf234k', done: true, items },
];

export const OrdersPage = () => {
  return (
    <main className="orders-page">
      <header className="orders-page__header">
        <img src={Logo} alt="Logo for Yum Yum Gimmi Sum" />
        <h1>Kitchen View</h1>
      </header>
      <Orders orders={orders} />
    </main>
  );
};
