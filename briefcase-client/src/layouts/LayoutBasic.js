import React from "react";
import { Layout } from "antd";
import LoadRoutes from "./LoadRoutes";
import "./LayoutBasic.scss";

export default function LayoutBasic({routes}) {
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <h2>Basic Menu Sider</h2>
      <Layout>
        <Content>
          <LoadRoutes routes={routes} />
        </Content>
        <Footer>Basic Footer</Footer>
      </Layout>
    </Layout>
  );
}

