import React from 'react'
import { NavLink } from '@mantine/core'
import { IconHome, IconDice5, IconUser, IconAward, IconSettings } from '@tabler/icons-react'
import classes from './Navbar.module.css'

const Navbar = () => {
    const itemNavbar = [
        { "title": "Home", "description": "Resumen de sorteos", "link": "/", "icon": IconHome },
        { "title": "Sorteos", "description": "Ver, crear y publicar sorteos", "link": "/sorteos", "icon": IconDice5 },
        { "title": "Premios", "description": "Ver, crear y publicar premios", "link": "/premios", "icon": IconAward },
        { "title": "Usuarios", "description": "Listado de usuarios", "link": "/usuarios", "icon": IconUser },
        { "title": "Configuración", "description": "Configuración de la aplicación", "link": "/configuracion", "icon": IconSettings }
    ]
    return (
        <>
            <nav >
                <div ></div>
                <div>
                    {itemNavbar.map((item, index) => (
                        <NavLink key={index} label={item.title} description={item.description} leftSection={<item.icon />} />
                    ))
                    }
                </div>
                <div></div>
            </nav>
        </>
    )
}

export default Navbar