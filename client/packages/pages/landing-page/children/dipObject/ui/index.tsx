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
            <p className='dipLabel'>{name}</p>
        </article>
    )
}