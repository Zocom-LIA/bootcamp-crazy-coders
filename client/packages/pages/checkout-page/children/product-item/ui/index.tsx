import { React } from 'react';
import { QuantitySetter } from '@zocom/quantity-setter';
import { List, Separator } from '@zocom/list';
import './style.scss';

type Props = {
  name: string | undefined;
  price: number;
  quantity: number;
};

export const ProductItem = ({ name, price, quantity }: Props) => {
  return (
    <li className="product-item">
      <List>
        <p className="product-item__name">{name}</p>
        <Separator />
        <p className="product-item__price">{price} SEK</p>
      </List>

      <QuantitySetter quantity={quantity} />
    </li>
  );
};
