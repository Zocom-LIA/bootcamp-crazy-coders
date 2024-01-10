import './style.scss';
import { Cart } from '@zocom/cart';
import { useSelector, useDispatch } from 'react-redux';
import { ReceiptTotal } from '@zocom/receipt-total';
import { Button } from '@zocom/button';
import { ProductItem } from '@zocom/product-item';
import { postOrder } from '..';
import {
  increaseQuantity,
  decreaseQuantity,
  emptyCart,
  addNewOrderToCustomerOrderHistory,
} from '../../../../src/reduxstore/slices/shoppingCartSlice';
import { RootState } from '../../../../src/reduxstore/store';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
type OrderItem = {
  count: number;
  name: string;
  totalPrice: number;
};

type Order = {
  customerId?: string;
  orderId?: string;
  totalSum: number;
  selection: OrderItem[];
  createdAt?: Date;
};

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shoppingCartItems = useSelector(
    (state: RootState) => state.shoppingCart.shoppingCartItems
  );

  function totalSum() {
    return shoppingCartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  function handleIncreaseQty(name: string) {
    dispatch(increaseQuantity(name));
  }

  function handleDecreaseQty(name: string) {
    dispatch(decreaseQuantity(name));
  }

  const orderItems: OrderItem[] = shoppingCartItems.map((item) => ({
    count: item.quantity,
    name: item.name,
    totalPrice: item.price * item.quantity,
  }));

  const newOrder: Order = {
    totalSum: totalSum(),
    selection: orderItems,
  };

  async function createOrder() {
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      const { customerId, orderId, totalSum, selection, createdAt }: Order =
        await postOrder(newOrder);

      if (customerId && orderId && totalSum && selection && createdAt) {
        localStorage.setItem('customerId', customerId);
        dispatch(
          addNewOrderToCustomerOrderHistory({
            customerId,
            orderId,
            totalSum,
            selection,
            createdAt,
          })
        );
        dispatch(emptyCart());
        navigate(`/order/${orderId}`);
      }
    } else {
      const existingCustomerNewOrder: Order = {
        customerId,
        ...newOrder,
      };

      if (existingCustomerNewOrder) {
        const order = await postOrder(existingCustomerNewOrder);
        dispatch(addNewOrderToCustomerOrderHistory(order));
        dispatch(emptyCart());
        navigate(`/order/${order.orderId}`);
      }
    }
  }

  return (
    <main className="checkout-page">
      <section className="checkout-page__cart">
        <IoIosArrowBack
          className="checkout-page__cart_arrow-back"
          onClick={() => navigate('/')}
        />
        <Cart bgColor="transparent" />
      </section>

      {orderItems.length > 0 ? (
        <ul className="checkout-page__customer-cart">
          {orderItems.map((item) => (
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
      ) : (
        <p>Your cart is empty</p>
      )}

      <section className="checkout-page__checkout">
        <section className="checkout-page__amount">
          <ReceiptTotal total={totalSum()} />
        </section>
        <Button
          disabled={orderItems.length > 0 ? false : true}
          onClick={() => createOrder()}
          type="primary"
        >
          Take my Money!
        </Button>
      </section>
    </main>
  );
};
