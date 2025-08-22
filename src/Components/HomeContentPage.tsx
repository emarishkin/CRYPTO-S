import { Content } from "antd/es/layout/layout";
import type { FC } from "react";

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 90px)',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};

export const HomeContentPage:FC = () => {
    return (
        <>
          <Content style={contentStyle}>Content</Content>
        </>
    )
}