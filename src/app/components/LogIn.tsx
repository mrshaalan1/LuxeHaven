"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Register from "./Register";
import { useRouter } from "next/navigation";

import {
  Button,
  Drawer,
  Form,
  Input,
  Checkbox,
  Space,
  message,
} from "antd";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LogIn: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };
  const handleCanleRegister = () => {
    setIsRegistering(false);
  };

  const [user, setUser] = React.useState({
    Email: "",
    Password: "",
  });
  const router = useRouter();

  const onLogin = async () => {
    axios
      .post("/api/users/login", user)
      .then((response) => {
        console.log("Login success", response.data);
        message.success("Logged In Successfully");
        localStorage.setItem("token", response.data.token);
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);

          let errorMessage = "An unknown error occurred";

          if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          }

          message.error(`Login failed: ${errorMessage}`);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <>
      <Button
        className="btn btn-ghost cursor-pointer font-sans font-bold hover:text-sand px-16 sm:px-auto text-2xl"
        type="primary"
        onClick={showDrawer}
      >
        Log In
        <FontAwesomeIcon icon={faSignInAlt} size="xs" />
        </Button>

      <Drawer
        title={isRegistering ? "Register" : "Log In"}
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <button onClick={onClose} className="shadow-sm text-black rounded-md border-black p-2 hover:bg-red-600 hover:text-white">Cancel</button>
          </Space>
        }
      >
        {isRegistering ? (
          <>
          <Register />
          <div className="flex mx-10">
          <p className="text-black text-base">Already have an account? 	&nbsp;</p>
          <button onClick={handleCanleRegister} className="text-blue-600 text-xl"> Login</button>
          </div>          
          </>
          
        ) : (
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                className="text-xl"
              />
            </Form.Item >

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={{fontSize:10}}
              className="text-xl"
            >
              <Input.Password
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
                className="text-xl"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                onClick={onLogin}
                type="primary"
                htmlType="submit"
                className="bg-primary"
              >
                Submit
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button onClick={handleRegister}>Register</Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default LogIn;
