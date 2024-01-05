import './style.scss';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToShoppingCart } from '../../../../src/reduxstore/slices/shoppingCartSlice';
import { RootState } from '../../../../src/reduxstore/store';
import { MenuObject } from '@zocom/menu-object';
import { DipObject } from '@zocom/dip-object';
import { getMenuData } from '..';
import { Cart } from '@zocom/cart';
import { Logo } from '@zocom/logo';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  cookingTime: number;
  ingredients: string[];
  quantity: number;
}

interface DipItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

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
      const menuObjects: MenuItem[] = data.record.wontons;
      const dipSauces: DipItem[] = data.record.dip;
  
      // Set unique IDs using nanoid
      const menuWithIds: MenuItem[] = menuObjects.map((menuItem) => ({ ...menuItem, id: nanoid() }));
      const dipWithIds: DipItem[] = dipSauces.map((dipItem) => ({ ...dipItem, id: nanoid() }));
  
      setMenu(menuWithIds || []);
      setDip(dipWithIds || []);
      setDipPrice(dipWithIds[0]?.price || 0);
    }
    handleFetchMenu();
  }, []);

  useEffect(() => {
    // Do something when shoppingCartItems change
  }, [shoppingCartItems]);

  const handleAddToCart = (foodItem: MenuItem | DipItem) => {
    console.log('click');
    dispatch(addToShoppingCart(foodItem));
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
              id={menuItem.id}
              key={menuItem.id}
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
                id={dipItem.id}
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
