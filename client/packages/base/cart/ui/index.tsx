import './style.scss';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/Cart.svg';

type Props = {
  quantity: number;
};

export const Cart = ({ quantity = 0 }: Props) => {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate('/check-out');
  }

  return (
    <article className="cart" onClick={handleOnClick}>
      <section className="cart__quantity">
        <span>{quantity}</span>
      </section>
      <img src={Logo} alt="cart-img" />
    </article>
  );
};
