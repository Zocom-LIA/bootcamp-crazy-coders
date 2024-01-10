import './style.scss';
import { AnimatePresence } from 'framer-motion';
import { Order } from '@zocom/order';
import { useData } from '..';
import { useData as useHookData } from '@zocom/refresh-fetch-hook';

export const Orders = () => {
  const { useFetchOrders, updateOrder } = useData();
  const { useRefreshFetch } = useHookData();

  const orders = useRefreshFetch(useFetchOrders());

  const ordersExist = Array.isArray(orders);

  return (
    <section className="orders">
      <section className="orders__section">
        <article className="orders__label">
          <h2>Ongoing</h2>
          <hr />
        </article>

        <section className="orders__items">
          <AnimatePresence>
            {ordersExist &&
              orders
                ?.filter((order) => order.status === 'assigned')
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
          </AnimatePresence>
        </section>
      </section>

      <section className="orders__section">
        <article className="orders__label">
          <h2>Done</h2>
          <hr />
        </article>

        <section className="orders__items">
          <AnimatePresence>
            {ordersExist &&
              orders
                ?.filter((order) => order.status !== 'assigned')
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
          </AnimatePresence>
        </section>
      </section>
    </section>
  );
};
