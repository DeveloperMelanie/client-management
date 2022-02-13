import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
    const location = useLocation()
    const actualUrl = location.pathname

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/4 bg-primary px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>
                    CRM - Clientes
                </h2>
                <nav className='mt-10'>
                    <Link
                        className={`${
                            actualUrl === '/clients'
                                ? 'text-blue-300'
                                : 'text-white'
                        } text-2xl block mt-2 hover:text-blue-300`}
                        to='/clients'
                    >
                        Clientes
                    </Link>
                    <Link
                        className={`${
                            actualUrl === '/clients/new'
                                ? 'text-blue-300'
                                : 'text-white'
                        } text-2xl block mt-2 hover:text-blue-300`}
                        to='/clients/new'
                    >
                        Nuevo Cliente
                    </Link>
                </nav>
            </div>
            <div className='md:w-3/4 p-10 md:h-screen overflow-y-scroll'>
                <Outlet />
            </div>
        </div>
    )
}
