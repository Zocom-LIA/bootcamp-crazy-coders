import './style.scss';

/* Import dependencies */
import { useEffect, useState } from 'react';
import { MenuObject } from '@zocom/menu-object';
import { DipObject } from '@zocom/dip-object';
import { getMenuData } from '..';

type MenuItem = {
    key: string, 
    name: string,
    description: string,
    price: number,
    cookingTime: number
    ingredients: string[],
} 

type DipItem = { 
    id: string,
    name: string,
    description: string,
    price: number,
} 

export const LandingPage = () => {

    const [menu, setMenu] = useState<MenuItem[]>([])
    const [dip, setDip] = useState<DipItem[]>([])
    const { fetchMenu } = getMenuData();
    
    useEffect(() => {
        async function handleFetchMenu() {
            const data = await fetchMenu()
            const menuObjects = data.record.wontons
            const dipSauces = data.record.dip;
            setMenu(menuObjects ? menuObjects: null)
            setDip(dipSauces ? dipSauces: null)
        }
        handleFetchMenu();
    }, []);

    return (
        <main className='landing-page'>
            <section className='menu'>
                <h1 className='title'>MENY</h1>
                {menu && menu.map((menuItem) => (
                    <MenuObject key={menuItem.key} name={menuItem.name} 
                        price={menuItem.price} desc={menuItem.description}
                        cookingTime={menuItem.cookingTime} ingredients={menuItem.ingredients}
                     />   
                ))}
                
            </section>
                {dip && dip.map((dipItem) => (
                    <DipObject key={dipItem.id} name={dipItem.name} 
                        price={dipItem.price} desc={dipItem.description}
                     />   
                ))}
            </section>
        </main>
    )
}