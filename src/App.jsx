import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './layout/Layout'

import Home from './pages/Home'
import NewClient from './pages/NewClient'
import ViewClient from './pages/ViewClient'
import EditClient from './pages/EditClient'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/clients' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='new' element={<NewClient />} />
                    <Route path=':id' element={<ViewClient />} />
                    <Route path='edit/:id' element={<EditClient />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
