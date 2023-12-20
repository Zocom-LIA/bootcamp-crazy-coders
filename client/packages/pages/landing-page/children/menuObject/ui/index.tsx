import React from 'react';
 import './style.scss';

interface MenuObject {
    id: string, 
    title: string,
    description: string,
    price: number,
    category: string
    ingredients?: [],
} 

interface MenuObjectProps {
    data: MenuObject
}

export const MenuObject = ({data}:MenuObjectProps) => {
    
    return (
        <article>
            <section>
                <h3>{data.title}</h3>
                {<hr className='dottedLine'/>}
                <h3>{data.price}</h3>
            </section>
            <section>
                <p>{data.description}</p>
            </section>
        </article>
    )
}