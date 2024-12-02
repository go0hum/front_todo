import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DashboardView from "./views/DashboardView";
import NotFound from '@/views/404/NotFound';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' index element={<DashboardView />} />
                </Route>

                <Route element={<Layout />}>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}