import { useNavigate } from 'react-router-dom'

export default function Client({ client, handleDelete }) {
    const navigate = useNavigate()

    const { name, company, email, telephone, id } = client

    return (
        <tr className='border-b hover:bg-gray-50'>
            <td className='p-3 text-center'>{name}</td>
            <td className='p-3 text-center'>
                <p>
                    <span className='text-gray-800 uppercase font-bold'>
                        Email:
                    </span>{' '}
                    {email}
                </p>
                <p>
                    <span className='text-gray-800 uppercase font-bold'>
                        Teléfono:
                    </span>{' '}
                    {telephone}
                </p>
            </td>
            <td className='p-3 text-center'>{company}</td>
            <td className='p-3'>
                <button
                    className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-sm'
                    type='button'
                    onClick={() => navigate(`/clients/${id}`)}
                >
                    Ver
                </button>
                <button
                    className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-sm mt-3'
                    type='button'
                    onClick={() => navigate(`/clients/edit/${id}`)}
                >
                    Editar
                </button>
                <button
                    className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-sm mt-3'
                    type='button'
                    onClick={() => handleDelete(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}
