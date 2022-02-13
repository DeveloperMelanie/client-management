import Form from '../components/Form'

export default function NewClient() {
    return (
        <>
            <h1 className='font-black text-4xl primary'>Nuevo Cliente</h1>
            <p className='mt-3'>
                Llena los siguientes campos para registrar un cliente
            </p>

            <Form />
        </>
    )
}
