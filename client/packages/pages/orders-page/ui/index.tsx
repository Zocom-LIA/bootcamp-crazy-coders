import './style.scss';
import { useEffect, useState } from 'react';
import { Orders } from '@zocom/orders';
import { OrdersRepsonse, useData } from '..';
import Logo from '../assets/logo.svg';

export const OrdersPage = () => {
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
    <main className="orders-page">
      <header className="orders-page__header">
        <img src={Logo} alt="Logo for Yum Yum Gimmi Sum" />
        <h1>Kitchen View</h1>
      </header>

      <Orders orders={orders} />
    </main>
  );
};
