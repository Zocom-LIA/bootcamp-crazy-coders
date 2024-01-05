import './style.scss';

type Props = {
  quantity: number;
  handleIncreaseQty: () => void;
  handleDecreaseQty: () => void;
};

export const QuantitySetter = ({
  handleIncreaseQty,
  handleDecreaseQty,
  quantity,
}: Props) => {
  return (
    <section className="quantity-input">
      <button className="quantity-input__btn-increase">
        <span onClick={handleIncreaseQty} className="quantity-input__btn-icon">
          +
        </span>
      </button>
      <p className="checkout-page__quantity">{quantity} stycken</p>
      <button
        onClick={handleDecreaseQty}
        className="quantity-input__btn-decrease"
      >
        <span className="quantity-input__btn-icon">-</span>
      </button>
    </section>
  );
};
