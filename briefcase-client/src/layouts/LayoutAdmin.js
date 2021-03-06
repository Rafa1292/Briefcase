import React, { useState } from "react";
import { Layout } from "antd";
import LoadRoutes from "./LoadRoutes";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn/SignIn";
import { Route, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./LayoutAdmin.scss";

export default function LayoutAdmin({ routes }) {
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">Admin Footer</Footer>
        </Layout>
      </Layout>
    );
  }

  return null
}
