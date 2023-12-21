 import './style.scss';

type props = {
    key: string,
    name: string,
    desc: string,
    ingredients: string[],
    price: number,
    cookingTime: number
} 

export const MenuObject = ({
    key, name, desc, ingredients, price, cookingTime} : props) => { 
    
    return (
        <article className='menuContainer'>
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