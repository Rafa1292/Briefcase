import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, notification } from "antd";
import {signInApi} from "../../../api/user";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../utils/constants";
import "./LoginForm.scss";

export default function LoginForm() {
  const { Item } = Form;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    
  };

  const login = async (e)=> {
      e.preventDefault();
      const result = await signInApi(inputs);
      console.log(result);
  }

  return (
    <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
      <Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
          value={inputs.email}
        />
      </Item>

      <Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          value={inputs.password}
        />
      </Item>
      <Item>
        <Button htmlType="submit" className="login-form__button">
          Iniciar sesion
        </Button>
      </Item>
    </Form>
  );
}
