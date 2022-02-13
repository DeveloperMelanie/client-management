import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Form from '../components/Form'
import Spinner from '../components/Spinner'

export default function EditClient() {
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
        <>
            <h1 className='font-black text-4xl primary'>Editar Cliente</h1>
            <p className='mt-3'>
                Llena los siguientes campos para registrar un cliente
            </p>

            {loading ? (
                <Spinner />
            ) : client?.name ? (
                <Form client={client} loading={loading} />
            ) : (
                <p>No hay resultados</p>
            )}
        </>
    )
}
