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
        <article>
            <section>
                <h3>{name}</h3>
                {<hr className='dottedLine'/>}
                <h3>{price} SEK</h3>
            </section>
            <section>
                <p>{ingredients}</p>
            </section>
        </article>
    )
}