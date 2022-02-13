import { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

import Client from '../components/Client'
import Spinner from '../components/Spinner'

export default function Home() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getClientsAPI = async () => {
            try {
                const url = import.meta.env.VITE_API_URL

                const response = await fetch(url)
                const result = await response.json()

                setClients(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getClientsAPI()
    }, [])

    const handleDelete = async id => {
        const result = await Swal.fire({
            title: '¿Deseas eliminar este cliente?',
            icon: 'question',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            showCloseButton: true,
        })

        if (result.isConfirmed) {
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                await fetch(url, {
                    method: 'DELETE',
                })

                setClients(clients.filter(client => client.id !== id))

                Swal.fire({
                    icon: 'success',
                    title: 'El cliente ha sido eliminado',
                    showConfirmButton: false,
                    timer: 1500,
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className='font-black text-4xl primary'>Clientes</h1>
                    <p className='mt-3'>Administra tus clientes</p>

                    <table className='w-full mt-5 table-auto shadow bg-white'>
                        <thead className='bg-primary text-white'>
                            <tr>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Contacto</th>
                                <th className='p-2'>Empresa</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {clients.map(client => (
                                <Client
                                    key={client.id}
                                    client={client}
                                    handleDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}
