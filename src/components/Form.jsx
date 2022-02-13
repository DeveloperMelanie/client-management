import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import Alert from './Alert'

export default function Formulary({ client }) {
    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'El Nombre es muy corto')
            .max(40, 'El Nombre es muy largo')
            .required('El Nombre del Cliente es obligatorio'),
        company: Yup.string().required(
            'El Nombre de la empresa es obligatorio'
        ),
        email: Yup.string()
            .email('Email inválido')
            .required('El Email es obligatorio'),
        telephone: Yup.number()
            .positive('No existen teléfonos con números negativos')
            .integer('Número inválido')
            .typeError('El Teléfono debe ser numérico'),
        notes: '',
    })

    const handleSubmit = async values => {
        try {
            if (client.id) {
                // Edit client
                const url = `http://localhost:4000/clients/${client.id}`

                await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            } else {
                // Create client
                const url = 'http://localhost:4000/clients'

                await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            }
            navigate('/clients')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
                {client?.name ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>

            <Formik
                initialValues={{
                    name: client?.name ?? '',
                    company: client?.company ?? '',
                    email: client?.email ?? '',
                    telephone: client?.telephone ?? '',
                    notes: client?.notes ?? '',
                }}
                enableReinitialize
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={newClientSchema}
            >
                {({ errors, touched }) => (
                    <Form className='mt-10'>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='name'>
                                Nombre:
                            </label>
                            <Field
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='name'
                                type='text'
                                placeholder='Nombre del Cliente'
                                name='name'
                            />
                            {errors.name && touched.name ? (
                                <Alert>{errors.name}</Alert>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='company'>
                                Empresa:
                            </label>
                            <Field
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='company'
                                type='text'
                                placeholder='Empresa del Cliente'
                                name='company'
                            />
                            {errors.company && touched.company ? (
                                <Alert>{errors.company}</Alert>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='email'>
                                E-mail:
                            </label>
                            <Field
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='email'
                                type='email'
                                placeholder='Email del Cliente'
                                name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alert>{errors.email}</Alert>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label
                                className='text-gray-800'
                                htmlFor='telephone'
                            >
                                Teléfono:
                            </label>
                            <Field
                                className='mt-2 block w-full p-3 bg-gray-50'
                                id='telephone'
                                type='tel'
                                placeholder='Teléfono del Cliente'
                                name='telephone'
                            />
                            {errors.telephone && touched.telephone ? (
                                <Alert>{errors.telephone}</Alert>
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label className='text-gray-800' htmlFor='notes'>
                                Notas:
                            </label>
                            <Field
                                className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                as='textarea'
                                id='notes'
                                type='text'
                                placeholder='Notas del Cliente'
                                name='notes'
                            />
                        </div>

                        <input
                            className='mt-5 w-full bg-primary p-3 text-white uppercase font-bold text-lg cursor-pointer'
                            type='submit'
                            value={
                                client?.name
                                    ? 'Editar Cliente'
                                    : 'Agregar Cliente'
                            }
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

Formulary.defaultProps = {
    client: {},
}
