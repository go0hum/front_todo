import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../components/logo";

export default function Layout() {
    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-full text-center">
                        <Logo />
                    </div>
                </div>
            </header>
            <section className="max-w-screen-2xl mx-auto mt-1 p-5">
                <Outlet />
            </section>
            <footer className="py-5">
                <p className="text-center">
                    All rights reserved {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
        
    )
}