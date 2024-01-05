import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToShoppingCart } from '../../../../../../src/reduxstore/slices//shoppingCartSlice'

type props = {
    id: string,
    name: string,
    desc: string,
    ingredients: string[],
    price: number,
    cookingTime: number
    onClick?: () => void;
} 

export const MenuObject = ({
    id, name, desc, ingredients, price, cookingTime, onClick} : props) => { 
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToShoppingCart({ name, price })); // You may need to adjust the structure based on your shoppingCartItem type
  };

    
    return (
        <article className='menuContainer' onClick={handleAddToCart}>
            <section className='menuItem'>
                <h3 className='wontonTitle'>{name}</h3>
                <hr className='dottedLine'/>
                <p className='wontonPrice'>{price + ' SEK'}</p>
            </section>
            <section>
                <p className='ingredients'>{ingredients.join(', ')}</p>
            </section>
            <hr className='separator'/>
        </article>
    )
}