import { Layout } from "antd";
import type { FC } from "react";
import { AppSider } from "../Components/AppSider";
import { AppHeader } from "../Components/AppHeader";
import { Route, Routes } from "react-router-dom";
import { HomeContentPage } from "../Components/HomeContentPage";

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
                </Routes>
            </div>
        </Layout>
        </Layout>
    </>
    )
}