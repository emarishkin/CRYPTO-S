import { Layout } from "antd";
import type { FC } from "react";
import { AppSider } from "../Components/AppSider";
import { AppHeader } from "../Components/AppHeader";
import { Route, Routes } from "react-router-dom";
import { HomeContentPage } from "../Components/HomeContentPage";
import { ROUTES } from "../utils/routes";
import { Diary } from "../Pages/Diary";
import { DealHistoryPage } from "../Pages/DealHistoryPage";

const layoutStyle = {
  overflow: 'hidden',
  maxWidth: '100%',
};

export const AppRoutes:FC = () => {
    return (
    <>
        <Layout style={layoutStyle}>
            <AppSider />
        <Layout>
            <AppHeader />
            <div className="content">
                <Routes>
                    <Route index element={<HomeContentPage />} />
                    <Route path={ROUTES.DIARY} element={<Diary />} />
                    <Route path={ROUTES.HISTORY} element={<DealHistoryPage />} />
                </Routes>
            </div>
        </Layout>
        </Layout>
    </>
    )
}