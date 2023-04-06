import { Outlet } from 'react-router-dom'

import Header from "../../components/Header"


const PrimaryLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main style={{ paddingTop: '140px', paddingBottom: '40px' }}><Outlet /></main>
        </>
    )
}

export default PrimaryLayout