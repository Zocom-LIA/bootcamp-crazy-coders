import './style.scss';

/* Import dependencies */
import { useEffect, useState } from 'react';
import { MenuObject } from '@zocom/menu-object';
import { getMenuData } from '..';

type MenuItem = {
    id: string, 
    title: string,
    description: string,
    price: number,
    category: string
    ingredients?: [],
} 

export const LandingPage = () => {

    const [menu, setMenu] = useState<MenuItem[]>([])
    const { fetchMenu } = getMenuData();
    
    useEffect(() => {
        async function handleFetchMenu() {
            const data = await fetchMenu()
            const menuObjects = data.wontons
            setMenu(menuObjects ? menuObjects: null)
            console.log(menuObjects);
        }
        handleFetchMenu();
    }, []);

    return (
        <main className='landing-page'>
            <h2>Meny</h2>
            <section>
                {menu && menu.map((menuItem) => (
                    <MenuObject key={menuItem.id} title={menuItem.title} price={menuItem.price} description={menuItem.description}/>
                ))}
            </section>
        </main>
    )
}