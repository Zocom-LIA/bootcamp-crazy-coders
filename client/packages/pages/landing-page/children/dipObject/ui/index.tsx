 import './style.scss';

type DipObjectProps = {
    key: string,
    name: string,
    desc: string,  
    price: number
} 

export const DipObject = ({
    key, name, desc, price} : DipObjectProps) => { 
    
    return (
        <article className='dipContainer'>
            <section className='dipItem'>
                <p>{name}</p>
            </section>
        </article>
    )
}