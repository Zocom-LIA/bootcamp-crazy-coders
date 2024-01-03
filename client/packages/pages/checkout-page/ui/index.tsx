import './style.scss';
import { Button } from '@zocom/button';

const handleButtonClick = () => {
  console.log("Checkout button clicked")
}

export const CheckoutPage = () => {
    return (
      <main className="checkout-page">
        <Button type="primary" onClick={handleButtonClick}>
          Take my money
        </Button>
      </main>
    );
  };