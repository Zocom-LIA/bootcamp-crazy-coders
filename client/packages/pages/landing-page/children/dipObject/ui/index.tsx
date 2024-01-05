 import './style.scss';
 import { useDispatch, useSelector } from 'react-redux';
import { addToShoppingCart } from '../../../../../../src/reduxstore/slices//shoppingCartSlice'

type props = {
    id: string,
    name: string,
    desc: string,  
    price: number
} 

export const DipObject = ({
    id, name, desc, price} : props) => { 

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToShoppingCart({ name, price })); // You may need to adjust the structure based on your shoppingCartItem type
    };
    return (
        <article className='dipContainer' onClick={handleAddToCart}>
            <p className='dipLabel'>{name}</p>
        </article>
    )
}