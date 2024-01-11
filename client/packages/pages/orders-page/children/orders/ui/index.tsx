import './style.scss';
import { AnimatePresence } from 'framer-motion';
import { Order } from '@zocom/order';
import { CardList } from '@zocom/card-list';
import { useData } from '..';
import { useData as useHookData } from '@zocom/refresh-fetch-hook';

export const Orders = () => {
  const { useFetchOrders, updateOrder } = useData();
  const { useRefreshFetch } = useHookData();

  const orders = useRefreshFetch(useFetchOrders());

  const ordersExist = Array.isArray(orders);

  return (
    <section className="orders">
      <CardList label="Ongoing">
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
      </CardList>

      <CardList label="Done">
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
      </CardList>
    </section>
  );
};
