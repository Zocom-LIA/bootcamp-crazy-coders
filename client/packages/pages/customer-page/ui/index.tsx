import './style.scss';
import { Button } from '@zocom/button';
import { Logo } from '@zocom/logo';
import foodBox from './assets/boxtop.svg';
import { useLocation, useNavigate } from 'react-router-dom';

/* 
1) om beställningen är klar, byt färg på backgrund. 
2) om beställningen är klar, ETA ska inte visas
*/

export function CustomerOrder() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { orderId } = state;
  console.log(orderId);
  function navigateToMenu() {
    navigate('/');
  }

  function navigateToCustomerReceipt(id: string) {
    navigate(`/receipt/${id}`);
  }

  return (
    <main className="customer-order">
      <section className="customer-order__logo">
        <Logo />
      </section>

      <section className="customer-order__info">
        <figure>
          <img src={foodBox} alt="takeaway box logo" />
        </figure>

        <h3 className="customer-order__info-food">Din beställning tillagas</h3>

        <h4 className="customer-order__info-eta">ETA 5 min</h4>
        <p className="customer-order__info-orderId">#{orderId}</p>
      </section>

      <section className="checkout-page__checkout">
        <Button type="primary" onClick={navigateToMenu}>
          beställ mer
        </Button>

        <Button
          type="secondary"
          onClick={() => navigateToCustomerReceipt(orderId)}
        >
          se kvitto
        </Button>
      </section>
    </main>
  );
}
