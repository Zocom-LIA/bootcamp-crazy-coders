import './style.scss';
import { Item } from '@zocom/types';

type ReceiptItemProps = {
  item: Item;
  currency?: string;
};

export const ReceiptItem = ({ item, currency = 'sek' }: ReceiptItemProps) => {
  return (
    <article className="receipt-item">
      <section className="receipt-item__item">
        <p className="receipt-item__product">{item.product}</p>

        <hr className="receipt-item__separator" />

        <p className="receipt-item__total">
          {item.total} {currency}
        </p>
      </section>

      <p className="receipt-item__quantity">{item.quantity} stycken</p>
    </article>
  );
};
