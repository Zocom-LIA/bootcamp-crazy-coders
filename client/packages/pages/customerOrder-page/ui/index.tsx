import './style.scss';
import foodBox from './assets/boxtop.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@zocom/button';
import { Logo } from '@zocom/logo';
import { useData } from '..';
import { useData as useHookData } from '@zocom/refresh-fetch-hook';

function randomETA() {
  const eta = [5, 10, 15, 20, 25];
  const index = Math.trunc(Math.random() * eta.length);
  return eta[index];
}

export function CustomerOrderPage() {
  const navigate = useNavigate();
  const { useFetchOrder } = useData();
  const { useRefreshFetch } = useHookData();
  const { orderId } = useParams<{ orderId: string }>();

  const order = useRefreshFetch(() => useFetchOrder(orderId));

  function navigateToMenu() {
    navigate('/');
  }

  function navigateToCustomerReceipt(id: string) {
    navigate(`/receipt/${id}`);
  }
  console.log(order);

  if (!order?.status) return <p>loading...</p>;

  const isDone = order?.status === 'ready' ? 'done' : '';

  return (
    <main className={`customer-order ${isDone}`}>
      <section className="customer-order__logo">
        <Logo />
      </section>

      <section className="customer-order__info">
        <figure>
          <img src={foodBox} alt="takeaway box logo" />
        </figure>

        <h3 className="customer-order__info-food">
          {order?.status !== 'ready'
            ? 'Din beställning tillagas'
            : 'Din beställning är klar!'}
        </h3>

        {order?.status !== 'ready' && (
          <h4 className="customer-order__info-eta">ETA {randomETA()} min</h4>
        )}

        <p className="customer-order__info-orderId">#{orderId}</p>
      </section>

      <section className="checkout-page__checkout">
        <Button type="primary" onClick={navigateToMenu}>
          beställ mer
        </Button>

        <Button
          type="secondary"
          onClick={() => navigateToCustomerReceipt(orderId as string)}
        >
          se kvitto
        </Button>
      </section>
    </main>
  );
}
