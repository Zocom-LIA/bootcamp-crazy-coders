import './style.scss';
import { useNavigate } from 'react-router-dom';
import Logo from './assets/Cart.svg';

type Props = {
  quantity?: number;
  bgColor?: string;
};

export const Cart = ({ quantity, bgColor }: Props) => {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate('/checkout');
  }

  return (
    <article
      style={{ backgroundColor: bgColor }}
      className="cart"
      onClick={handleOnClick}
    >
      {quantity !== undefined && (
        <section className="cart__quantity">
          <span>{quantity}</span>
        </section>
      )}
      <img src={Logo} alt="cart-img" />
    </article>
  );
};
