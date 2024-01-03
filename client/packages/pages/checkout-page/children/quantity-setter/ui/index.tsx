import './style.scss';

type Props = {
  quantity: number;
};

export const QuantitySetter = ({ quantity }: Props) => {
  return (
    <section className="quantity-input">
      <button className="quantity-input__btn-increase">
        <span className="quantity-input__btn-icon">+</span>
      </button>
      <p className="checkout-page__quantity">{quantity} stycken</p>
      <button className="quantity-input__btn-decrease">
        <span className="quantity-input__btn-icon">-</span>
      </button>
    </section>
  );
};
