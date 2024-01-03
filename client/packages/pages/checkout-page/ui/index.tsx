import './style.scss';
import { Cart } from '@zocom/cart';
import { Modal } from '@zocom/modal';
import { ReceiptTotal } from '@zocom/receipt-total';
import { Button } from '@zocom/button';
import { ProductItem } from '@zocom/product-item';

// Hämta cart från redux?
// Take my money btn ska skicka order till databasen

const fakeCart = [
  {
    quantity: 1,
    name: 'Karlstad',
    price: 9,
  },
  {
    quantity: 2,
    name: 'BANGKOK',
    price: 9,
  },
  {
    quantity: 1,
    name: 'Ho Chi Minh',
    price: 9,
  },
  {
    quantity: 1,
    name: 'PARIS',
    price: 9,
  },
  {
    quantity: 1,
    name: 'Oaxaca',
    price: 9,
  },
  {
    quantity: 1,
    name: 'SWEET CHILI DIP',
    price: 19,
  },
];

export const CheckoutPage = () => {
  return (
    // <Modal>
    <main className="checkout-page">
      <section className="checkout-page__cart">
        <Cart bgColor="transparent" />
      </section>

      <ul className="checkout-page__customer-cart">
        {fakeCart.map((item) => (
          <ProductItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            key={item.name}
          />
        ))}
      </ul>

      <section className="checkout-page__checkout">
        <section className="checkout-page__amount">
          <ReceiptTotal total={199} />
        </section>

        <Button onClick={() => console.log('first')} type="primary">
          Take my Money
        </Button>
      </section>
    </main>
    // </Modal>
  );
};
