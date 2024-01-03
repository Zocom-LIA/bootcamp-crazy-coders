import './style.scss';
import { List, Separator } from '@zocom/list';
import { Cart } from '@zocom/cart';
import { Modal } from '@zocom/modal';
import { ReceiptTotal } from '@zocom/receipt-total';
import { Button } from '@zocom/button';
import { QuantitySetter } from '@zocom/quantity-setter';

// Hämta cart
// Loopa igenom varje item i cart.
// Rendera det i ul listan.
// Take my money btn ska skicka order till data basen

const fakeCart = [
  {
    quantity: 1,
    item: 'Karlstad',
    price: 9,
  },
  {
    quantity: 2,
    item: 'BANGKOK',
    price: 9,
  },
  {
    quantity: 1,
    item: 'Ho Chi Minh',
    price: 9,
  },
  {
    quantity: 1,
    item: 'PARIS',
    price: 9,
  },
  {
    quantity: 1,
    item: 'Oaxaca',
    price: 9,
  },
  {
    quantity: 1,
    item: 'SWEET CHILI DIP',
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
        {fakeCart.map((item) => {
          return (
            <li className="checkout-page__product-description" key={item.item}>
              <List>
                <p className="checkout-page__product-name">{item.item}</p>
                <Separator />
                <p className="checkout-page__price">{item.price} SEK</p>
              </List>

              <QuantitySetter quantity={item.quantity} />
            </li>
          );
        })}
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
