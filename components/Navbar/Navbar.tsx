import React from 'react'
import { NavLink } from '@mantine/core'
import { IconHome, IconDice5, IconUser, IconAward, IconSettings } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
const Navbar = () => {
    const router = useRouter()
    const itemNavbar = [
        { "title": "Home", "description": "Resumen de sorteos", "link": "/dashboard", "icon": IconHome },
        { "title": "Sorteos", "description": "Ver, crear y publicar sorteos", "link": "/dashboard/sorteos", "icon": IconDice5 },
        { "title": "Premios", "description": "Ver, crear y publicar premios", "link": "/dashboard/premios", "icon": IconAward },
        { "title": "Usuarios", "description": "Listado de usuarios", "link": "/dashboard/usuarios", "icon": IconUser },
        { "title": "Configuración", "description": "Configuración de la aplicación", "link": "/dashboard/configuracion", "icon": IconSettings }
    ]
    return (
        <>
            <nav >
                <div ></div>
                <div>
                    {itemNavbar.map((item, index) => (
                        <NavLink key={index} label={item.title} description={item.description} leftSection={<item.icon />} onClick={() => router.push(item.link)} />
                    ))
                    }
                </div>
                <div></div>
            </nav>
        </>
    )
}

export default Navbar