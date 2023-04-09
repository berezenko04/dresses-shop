import { Outlet } from 'react-router-dom'

import Navbar from '@/components/Navbar'


const PrimaryLayout: React.FC = () => {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '60px', paddingBottom: '40px' }}><Outlet /></main>
        </>
    )
}

export default PrimaryLayout