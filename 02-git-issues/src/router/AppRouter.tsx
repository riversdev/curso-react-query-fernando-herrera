import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { IssuePage, IssuesPage } from '../pages'

export const AppRouter: FC = () => {
    return (
        <div className='container mt-3'>
            <h1>Git issues <small>Seguimiento de problemas</small></h1>

            <Routes>
                <Route path='issues' element={<IssuesPage />} />
                <Route path='issues/:id' element={<IssuePage />} />

                <Route path='*' element={<Navigate to='issues' />} />
            </Routes>
        </div>
    )
}