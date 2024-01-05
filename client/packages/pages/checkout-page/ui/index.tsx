import './style.scss';
import { Cart } from '@zocom/cart';
import { ReceiptTotal } from '@zocom/receipt-total';
import { Button } from '@zocom/button';
import { ProductItem } from '@zocom/product-item';
import { postOrder } from '..';
import { useState } from 'react';

// import { useState } from 'react';
// Hämta cart från redux?
// Take my money btn ska skicka order till databasen

type Cart = {
  count: number;
  name: string;
  totalPrice: number;
}[];

type Order = {
  customerId?: string;
  totalSum: number;
  selection: Cart;
};

const fakeCart: Cart = [
  {
    count: 1,
    name: 'Karlstad',
    totalPrice: 9,
  },
  {
    count: 1,
    name: 'Bangkok',
    totalPrice: 9,
  },
];

export const CheckoutPage = () => {
  const [customerCart, setCustomerCart] = useState<Cart>(fakeCart);

  function totalSum() {
    const total = customerCart.reduce((acc, item) => acc + item.totalPrice, 0);
    return total;
  }

  function handleIncreaseQty(name: string) {
    setCustomerCart((currentCart) => {
      const updatedCart: Cart = currentCart.map((product) => {
        if (product.name === name) {
          return {
            ...product,
            count: product.count + 1,
            totalPrice: product.totalPrice + 9, //! SKA ÄNDRAS
          };
        }
        return product;
      });

      return updatedCart;
    });
  }

  function handleDecreaseQty(name: string) {
    setCustomerCart((currentCart) => {
      const updatedCart = currentCart.map((product) => {
        if (product.name === name) {
          return {
            ...product,
            count: product.count > 1 ? product.count - 1 : product.count,
            totalPrice:
              product.count > 1 ? product.totalPrice - 9 : product.totalPrice, //! SKA ÄNDRAS
          };
        }
        return product;
      });

      return updatedCart;
    });
  }

  const testOrder: Order = {
    totalSum: totalSum(),
    selection: customerCart,
  };

  async function createOrder() {
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      const order: Order = await postOrder(testOrder);
      if (order.customerId) {
        localStorage.setItem('customerId', order?.customerId);
      }
    } else {
      const existingCustomer: Order = {
        customerId,
        ...testOrder,
      };
      postOrder(existingCustomer);
    }
  }

  return (
    <main className="checkout-page">
      <section className="checkout-page__cart">
        <Cart bgColor="transparent" />
      </section>

      <ul className="checkout-page__customer-cart">
        {customerCart.map((item) => (
          <ProductItem
            name={item.name}
            price={item.totalPrice}
            quantity={item.count}
            key={item.name}
            handleIncreaseQty={() => handleIncreaseQty(item.name)}
            handleDecreaseQty={() => handleDecreaseQty(item.name)}
          />
        ))}
      </ul>

      <section className="checkout-page__checkout">
        <section className="checkout-page__amount">
          <ReceiptTotal total={totalSum()} />
        </section>
        <Button onClick={() => createOrder()} type="primary">
          Take my Money
        </Button>
      </section>
    </main>
  );
};
