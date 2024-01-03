import './style.scss';
import { Order } from '@zocom/order';
import { OrdersRepsonse, useData } from '..';
import { useEffect, useState } from 'react';

export const Orders = () => {
  const [orders, setOrders] = useState<OrdersRepsonse>([]);

  const { fetchOrders } = useData();

  useEffect(() => {
    const fetchData = async () => {
      const orders = await fetchOrders();
      setOrders(orders);
    };

    fetchData();
  }, []);

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
              />
            ))}
        </section>
      </section>
    </section>
  );
};
