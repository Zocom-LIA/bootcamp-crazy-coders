import { Logo } from '@zocom/logo';
import './style.scss';

import { Receipt } from '@zocom/receipt';
import { Button } from '@zocom/button';

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

export const ReceiptPage = () => {
  return (
    <main className="receipt-page">
      <section className="receipt-page__logo">
        <Logo />
      </section>
      <Receipt
        items={items}
        total={items.reduce((acc, item) => acc + item.total, 0)}
        orderId="4kjwsdf234k"
      />
    </main>
  );
};
