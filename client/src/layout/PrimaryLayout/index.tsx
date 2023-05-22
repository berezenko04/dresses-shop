import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

//styles
import 'react-toastify/dist/ReactToastify.css';

//components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportUkraine from '@/components/SupportUkraine'



const PrimaryLayout: React.FC = () => {
    return (
        <>
            <SupportUkraine />
            <Navbar />
            <main style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <Outlet />
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    theme="light"
                />
            </main>
            <Footer />
        </>
    )
}

export default PrimaryLayout