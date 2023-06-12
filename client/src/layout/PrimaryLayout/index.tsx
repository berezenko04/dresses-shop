import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

//styles
import 'react-toastify/dist/ReactToastify.css';

//components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportUkraine from '@/components/SupportUkraine'
import BreadCrumbs from '@/components/BreadCrumbs';


const PrimaryLayout: React.FC = () => {
    const location = useLocation();
    return (
        <>
            <SupportUkraine />
            <Navbar />
            {location.pathname !== '/Sandrela' && <BreadCrumbs />}
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