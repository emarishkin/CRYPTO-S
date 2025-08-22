import { Header } from "antd/es/layout/layout";
import type { FC } from "react";

  const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 90,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  };

export const AppHeader:FC = () => {
    return (
        <>
          <Header style={headerStyle}>Header</Header>
        </>
    )
}