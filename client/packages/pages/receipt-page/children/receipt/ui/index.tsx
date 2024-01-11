import './style.scss';
import Logo from './assets/logo.png';
import { ReceiptItem } from '@zocom/receipt-item';
import { ReceiptTotal } from '@zocom/receipt-total';
import { Item } from '@zocom/types';

type Props = {
  orderId: string;
  items: Item[];
  total: number;
};

export const Receipt = ({ orderId, items, total }: Props) => {
  return (
    <article className="receipt">
      <header className="receipt__header">
        <img className="receipt__logo" src={Logo} alt="Logo" />

        <section>
          <h2 className="receipt__title">Kvitto</h2>
          <p className="receipt__order-id">#{orderId}</p>
        </section>
      </header>

      <section className="receipt__items">
        <ol>
          {items.map((item) => (
            <li key={item.name}>
              <ReceiptItem item={item} />
            </li>
          ))}
        </ol>
      </section>

      <footer className="receipt__total">
        <ReceiptTotal total={total} />
      </footer>
    </article>
  );
};
