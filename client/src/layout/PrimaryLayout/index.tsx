import { Outlet } from 'react-router-dom'

//components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportUkraine from '@/components/SupportUkraine'


const PrimaryLayout: React.FC = () => {
    return (
        <>
            <SupportUkraine />
            <Navbar />
            <main style={{ paddingTop: '60px', paddingBottom: '60px' }}><Outlet /></main>
            <Footer />
        </>
    )
}

export default PrimaryLayout