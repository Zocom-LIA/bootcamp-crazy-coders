import './style.scss';
import { Order } from '@zocom/order';
import { OrderType } from '@zocom/types';

type Props = {
  orders: OrderType[];
};

export const Orders = ({ orders }: Props) => {
  console.log(orders);

  return (
    <section className="orders">
      <section className="orders__section">
        <article className="orders__label">
          <h2>Ongoing</h2>
          <hr />
        </article>

        <section className="orders__items">
          {orders
            .filter((order) => order.status === 'assigned')
            .map((order) => (
              <Order id={order.orderId} items={order.selection} done={true} />
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
            .filter((order) => order.status !== 'assigned')
            .map((order) => (
              <Order id={order.orderId} items={order.selection} done={true} />
            ))}
        </section>
      </section>
    </section>
  );
};
