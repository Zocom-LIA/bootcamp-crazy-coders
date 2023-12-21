 import './style.scss';

type props = {
    key: string,
    name: string,
    desc: string,  
    price: number
} 

export const DipObject = ({
    key, name, desc, price} : props) => { 
    return (
        <article className='dipContainer'>
            <section className='dipItem'>
                <p className='dipLabel'>{name}</p>
            </section>
        </article>
    )
}