import './style.scss';

/* Import dependencies */
import { useEffect, useState } from 'react';
import { MenuObject } from '@zocom/menu-object';
import { getMenuData } from '..';

type MenuItem = {
    key: string, 
    name: string,
    description: string,
    price: number,
    cookingTime: number
    ingredients: string[],
} 

export const LandingPage = () => {

    const [menu, setMenu] = useState<MenuItem[]>([])
    const { fetchMenu } = getMenuData();
    
    useEffect(() => {
        async function handleFetchMenu() {
            const data = await fetchMenu()
            const menuObjects = data.record.wontons
            setMenu(menuObjects ? menuObjects: null)
        }
        handleFetchMenu();
    }, []);

    return (
        <main className='landing-page'>
            <h2>Meny</h2>
            <section className='menu'>
                {menu && menu.map((menuItem) => (
                    <MenuObject key={menuItem.key} name={menuItem.name} 
                        price={menuItem.price} desc={menuItem.description}
                        cookingTime={menuItem.cookingTime} ingredients={menuItem.ingredients}
                     />
                ))}
            </section>
        </main>
    )
}