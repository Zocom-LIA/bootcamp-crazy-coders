import './style.scss';
import { Order } from '@zocom/order';
import { Item } from '@zocom/types';

type Props = {
  orders: Array<{
    id: string;
    items: Item[];
    done: boolean;
  }>;
};

export const Orders = ({ orders }: Props) => {
  return (
    <section className="orders">
      <section className="orders__section">
        <article className="orders__label">
          <h2>Ongoing</h2>
          <hr />
        </article>

        <section className="orders__items">
          {orders
            .filter((order) => !order.done)
            .map((order) => (
              <Order id={order.id} items={order.items} done={order.done} />
            ))}
        </section>
      </section>

      <section className="orders__section">
        <article className="orders__label">
          <h2>Done</h2>
          <hr />
        </article>

        <section className="orders__items">
          {orders
            .filter((order) => order.done)
            .map((order) => (
              <Order id={order.id} items={order.items} done={order.done} />
            ))}
          {orders
            .filter((order) => order.done)
            .map((order) => (
              <Order id={order.id} items={order.items} done={order.done} />
            ))}
        </section>
      </section>
    </section>
  );
};
