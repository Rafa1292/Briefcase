import React from "react";
import "./MenuTop.scss";
import Logo from "../../../assets/img/logoNebulosa.png";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  const MenuIcon = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="Nebulosa" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          <MenuIcon />
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
