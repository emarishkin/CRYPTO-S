import Sider from "antd/es/layout/Sider";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import "../Styles/AppSider.css";

export const AppSider: FC = () => {
    return (
        <Sider width="20%" className="app-sider">
            <section className="nav-link-sider">
                <div className="container-link">
                    <Link to={ROUTES.HOME} className="link-home">
                       Главная
                    </Link> 
                    <Link to={ROUTES.DIARY} className="link-diary">
                       Дневник
                    </Link>
                    <Link to={ROUTES.STRATEGIES} className="link-strategies">
                       Стратегии
                    </Link>
                    <Link to={ROUTES.RULES} className="link-rules">
                       Правила
                    </Link>
                    <Link to={ROUTES.STATISTICS} className="link-statistics">
                       Статистика
                    </Link>
                    <Link to={ROUTES.HISTORY} className="link-history">
                       История сделок
                    </Link>  
                </div>
            </section>
        </Sider>
    )
}