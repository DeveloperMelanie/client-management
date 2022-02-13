import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from '../components/Spinner'

export default function ViewClient() {
    const [client, setClient] = useState({})
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        const getClientAPI = async () => {
            try {
                const url = `http://localhost:4000/clients/${id}`

                const response = await fetch(url)
                const result = await response.json()

                setClient(result)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getClientAPI()
    }, [])

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(client).length === 0 ? (
                        <p>No hay resultados</p>
                    ) : (
                        <>
                            <h1 className='font-black text-4xl primary'>
                                Ver Cliente: {client.name}
                            </h1>
                            <p className='mt-3'>Información del Cliente</p>

                            {client.name && (
                                <p className='text-4xl mt-10 text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>
                                        Cliente:
                                    </span>{' '}
                                    {client.name}
                                </p>
                            )}
                            {client.email && (
                                <p className='text-2xl mt-4 text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>
                                        Email:
                                    </span>{' '}
                                    {client.email}
                                </p>
                            )}
                            {client.telephone && (
                                <p className='text-2xl mt-4 text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>
                                        Teléfono:
                                    </span>{' '}
                                    {client.telephone}
                                </p>
                            )}
                            {client.company && (
                                <p className='text-2xl mt-4 text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>
                                        Empresa:
                                    </span>{' '}
                                    {client.company}
                                </p>
                            )}
                            {client.notes && (
                                <p className='text-2xl mt-4 text-gray-600'>
                                    <span className='text-gray-800 uppercase font-bold'>
                                        Notas:
                                    </span>{' '}
                                    {client.notes}
                                </p>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
