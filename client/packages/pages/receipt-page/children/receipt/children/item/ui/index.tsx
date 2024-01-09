import './style.scss';
import { Item } from '@zocom/types';
import { List, Separator } from '@zocom/list';

type ReceiptItemProps = {
  item: Item;
};

export const ReceiptItem = ({ item }: ReceiptItemProps) => {
  return (
    <article className="receipt-item">
      <List>
        <p className="receipt-item__product">{item.product}</p>

        <Separator />

        <p className="receipt-item__total">{item.total} sek</p>
      </List>

      <p className="receipt-item__quantity">{item.quantity} stycken</p>
    </article>
  );
};
