import { QuantitySetter } from '@zocom/quantity-setter';
import { List, Separator } from '@zocom/list';
import './style.scss';

type Props = {
  name: string;
  price: number;
  quantity: number;
  handleIncreaseQty: () => void;
  handleDecreaseQty: () => void;
};

export const ProductItem = ({
  name,
  price,
  quantity,
  handleIncreaseQty,
  handleDecreaseQty,
}: Props) => {
  return (
    <li className="product-item">
      <List>
        <p className="product-item__name">{name}</p>
        <Separator />
        <p className="product-item__price">{price} SEK</p>
      </List>

      <QuantitySetter
        handleIncreaseQty={handleIncreaseQty}
        handleDecreaseQty={handleDecreaseQty}
        quantity={quantity}
      />
    </li>
  );
};
