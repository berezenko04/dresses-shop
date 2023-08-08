import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

//styles
import styles from './PrimaryLayout.module.scss'
import 'react-toastify/dist/ReactToastify.css';

//components
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SupportUkraine from '@/components/HeaderAlert'
import BreadCrumbs from '@/components/BreadCrumbs';


const PrimaryLayout: React.FC = () => {
    const location = useLocation();
    return (
        <>
            <SupportUkraine />
            <Navbar />
            {location.pathname !== '/' && <BreadCrumbs />}
            <main className={styles.main}>
                <Outlet />
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme="light"
                />
            </main>
            <Footer />
        </>
    )
}

export default PrimaryLayout