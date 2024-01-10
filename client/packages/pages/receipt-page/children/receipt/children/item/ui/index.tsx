import './style.scss';
import { Item } from '@zocom/types';
import { List, Separator } from '@zocom/list';

type Props = {
  item: Item;
};

export const ReceiptItem = ({ item }: Props) => {
  return (
    <article className="receipt-item">
      <List>
        <p className="receipt-item__product">{item.name}</p>

        <Separator />

        <p className="receipt-item__total">{item.totalPrice} sek</p>
      </List>

      <p className="receipt-item__quantity">{item.count} stycken</p>
    </article>
  );
};
