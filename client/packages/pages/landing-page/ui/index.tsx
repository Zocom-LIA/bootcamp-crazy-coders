import './style.scss';

/* Import dependencies */
import { useEffect, useState } from 'react';
import { MenuObject } from '@zocom/menu-object';
import { getMenuData } from '..';

type MenuItem = {
    id: string, 
    title: string,
    desc: string,
    price: number,
    category: string
    ingredients?: [],
} 

export const LandingPage = () => {

    const [menu, setMenu] = useState<MenuItem[]>([])
    const {fetchMenu} = getMenuData();
    
    useEffect(() => {
        async function handleFetchMenu() {
            const data = await fetchMenu()
            const menu = data.menu
            setMenu(menu ? menu: null)
            console.log(menu);
            
        }
        handleFetchMenu();
    }, []);

    const sortedMenu = menu.sort((a, b) => a.id - b.id);

    return (
        <main>
            <h2>Meny</h2>
            <section>
                {sortedMenu && sortedMenu.map((menuItem) => (
                    <MenuObject key={menuItem.id} title={menuItem.title} price={menuItem.price} desc={menuItem.desc}/>
                ))}
            </section>
        </main>
    )
}