import './style.scss';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToShoppingCart } from '../../../../src/reduxstore/slices/shoppingCartSlice'
import { RootState } from '../../../../src/reduxstore/store';
import { MenuObject } from '@zocom/menu-object';
import { DipObject } from '@zocom/dip-object';
import { getMenuData } from '..';
import { Cart } from '@zocom/cart';
import { Logo } from '@zocom/logo';

type MenuItem = {
  id: string;
  key: string;
  name: string;
  description: string;
  price: number;
  cookingTime: number;
  ingredients: string[];
  quantity: number;
};

type DipItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export const LandingPage = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [dip, setDip] = useState<DipItem[]>([]);
  const [dipPrice, setDipPrice] = useState(0);
  const { fetchMenu } = getMenuData();

  const dispatch = useDispatch();
  const shoppingCartItems = useSelector((state: RootState) => state.shoppingCart.shoppingCartItems);

  useEffect(() => {
    async function handleFetchMenu() {
      const data = await fetchMenu();
      const menuObjects = data.record.wontons;
      const dipSauces = data.record.dip;
      console.log(data);  
      setMenu(menuObjects ? menuObjects : null);
      setDip(dipSauces ? dipSauces : null);
      setDipPrice(dipSauces[0].price);
    }
    handleFetchMenu();
  }, []);

  useEffect(() => {
    
  }, [shoppingCartItems]);

  const handleAddToCart = (menuItem: MenuItem) => {
    console.log("click");
    dispatch(addToShoppingCart(menuItem));
  };

  function totalQuantity() {
    return shoppingCartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  return (
    <main className="landing-page">
      <section className="landing-page__header">
        <Logo />
        <Cart quantity={totalQuantity()} />
      </section>

      <section className="menu">
        <h1 className="title">MENY</h1>
        {menu &&
          menu.map((menuItem) => (
            <MenuObject
              key={menuItem.key}
              name={menuItem.name}
              price={menuItem.price}
              desc={menuItem.description}
              cookingTime={menuItem.cookingTime}
              ingredients={menuItem.ingredients}
              onClick={() => handleAddToCart(menuItem)}
            />
          ))}
        <section className="dipTitlePrice">
          <p className="dipTitle">DIPSÅS</p>
          <hr className="dipDottedLine" />
          <p className="dipPrice">{dipPrice + ' SEK'}</p>
        </section>
        <section className="dipItems">
          {dip &&
            dip.map((dipItem) => (
              <DipObject
                key={dipItem.id}
                name={dipItem.name}
                price={dipItem.price}
                desc={dipItem.description}
              />
            ))}
        </section>
      </section>
    </main>
  );
};
