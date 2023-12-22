import './style.scss';
import { Order } from '@zocom/order';

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

export const OrdersPage = () => {
  return (
    <main className="orders-page">
      <Order id="4kjwsdf234k" items={items} completed={true} />
      <Order id="4kjwsdf234k" items={items} completed={false} />
    </main>
  );
};
