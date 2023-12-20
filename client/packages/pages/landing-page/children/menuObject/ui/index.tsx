 import './style.scss';

type MenuObjectProps = {
    title: string,
    description: string,
    price: number,
} 

export const MenuObject = ({title, description, price} : MenuObjectProps) => { 
    
    return (
        <article>
            <section>
                <h3>{title}</h3>
                {<hr className='dottedLine'/>}
                <h3>{price}</h3>
            </section>
            <section>
                <p>{description}</p>
            </section>
        </article>
    )
}