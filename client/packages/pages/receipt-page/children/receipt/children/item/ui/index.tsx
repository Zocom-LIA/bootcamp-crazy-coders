import './style.scss';
import { Item } from '@zocom/types';
import { List, ListType, Separator } from '@zocom/list';

type ReceiptItemProps = {
  item: Item;
  currency?: string;
};

export const ReceiptItem = ({ item, currency = 'sek' }: ReceiptItemProps) => {
  return (
    <article className="receipt-item">
      <List>
        <p className="receipt-item__product">{item.product}</p>
        <Separator />

        <p className="receipt-item__total">
          {item.total} {currency}
        </p>
      </List>

      <p className="receipt-item__quantity">{item.quantity} stycken</p>
    </article>
  );
};
