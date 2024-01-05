import './style.scss';
import { Order } from '@zocom/order';
import { useData } from '..';

export const Orders = () => {
  const { useFetchOrders, updateOrder } = useData();

  const orders = useFetchOrders();

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
              <Order
                id={order.orderId}
                items={order.selection}
                done={false}
                startTime={order.startTime}
                key={order.orderId}
                onClick={() => updateOrder(order.orderId, order.customerId)}
              />
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
              <Order
                id={order.orderId}
                items={order.selection}
                done={true}
                startTime={order.startTime}
                endTime={order.endTime}
                key={order.orderId}
                onClick={() => updateOrder(order.orderId, order.customerId)}
              />
            ))}
        </section>
      </section>
    </section>
  );
};
