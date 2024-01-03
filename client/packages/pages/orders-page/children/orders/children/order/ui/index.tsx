import './style.scss';
import { Fragment } from 'react';
import { Item } from '@zocom/types';
import { List, Separator } from '@zocom/list';
import { Button } from '@zocom/button';

type Props = {
  id: string;
  items: Item[];
  done: boolean;
};

export const Order = ({ id, items, done }: Props) => {
  const status = done ? 'done' : 'cooking';

  return (
    <article className={`order order--${status}`}>
      <header>
        <h2 className="order__id">#{id}</h2>
      </header>

      <section className="order__items">
        {items.map((item) => (
          <Fragment key={item.name}>
            <article className="order__item">
              <List>
                <p className="order__product">{item.name}</p>

                <Separator />

                <p className="order__item-quantity">{item.count} st</p>
              </List>
            </article>

            <p className="order__item-total">{item.totalPrice} sek</p>
          </Fragment>
        ))}
        <hr className="order__separator" />

        <h3 className="order__total">
          {items.reduce((acc, item) => acc + item.totalPrice, 0)} sek
        </h3>
      </section>

      <section className="order__time">
        <p>Tillagningstid </p>
      </section>

      <Button onClick={() => {}} type={done ? 'success' : 'alert'}>
        {done ? 'Serverad' : 'Redo att serveras'}
      </Button>
    </article>
  );
};
