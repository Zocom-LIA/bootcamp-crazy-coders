 import './style.scss';

type MenuObjectProps = {
    key: string,
    name: string,
    desc: string,
    ingredients: string[],
    price: number,
    cookingTime: number
} 

export const MenuObject = ({
    key, name, desc, ingredients, price, cookingTime} : MenuObjectProps) => { 
    
    return (
        <article className='menuContainer'>
            <section className='menuItem'>
                <h3 className='wontonTitle'>{name}</h3>
                <hr className='dottedLine'/>
                <h3>{price} SEK</h3>
            </section>
            <section>
                <p>{ingredients}</p>
            </section>
            <hr className='separator'/>
        </article>
    )
}