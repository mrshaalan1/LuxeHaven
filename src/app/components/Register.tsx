"use client";

import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LogIn from "./LogIn";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.FC = () => {
  const router = useRouter();

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      console.log("Received values of form: ", values);

      onSignup();
    } catch (error) {
      console.error("Form validation failed", error);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 80 }}>
        <Option value="961">+961</Option>
        <Option value="1">+1</Option>
      </Select>
    </Form.Item>
  );
  const [user, setUser] = React.useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Username: "",
    PhoneNumber: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const ERROR = () => {
    messageApi.open({
      type: "error",
      content: "Unknown Error occured",
    });
  };

  const onSignup = async () => {
    axios
      .post("/api/users/register", user)
      .then((response) => {
        console.log("signup success", response.data);
        message.success("Registered Successfully");
        message.warning("Please Check Your Email For Confirmation");
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          message.error(`Signup failed: ${error.response.data.error}`);
        } else {
          ERROR();
        }
      });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ prefix: "961" }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="First name"
        label="First Name"
        rules={[{ required: true }]}
      >
        <Input
          id="firstName"
          value={user.FirstName}
          onChange={(e) => setUser({ ...user, FirstName: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="Last name"
        label="Last Name"
        rules={[{ required: true }]}
      >
        <Input
          id="lastName"
          value={user.LastName}
          onChange={(e) => setUser({ ...user, LastName: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input
          id="Username"
          value={user.Username}
          onChange={(e) => setUser({ ...user, Username: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          id="email"
          value={user.Email}
          onChange={(e) => setUser({ ...user, Email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password
          id="password"
          value={user.Password}
          onChange={(e) => setUser({ ...user, Password: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{ width: "100%" }}
          id="phoneNumber"
          pattern="\d*"
          value={user.PhoneNumber}
          onChange={(e) => setUser({ ...user, PhoneNumber: e.target.value })}
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button htmlType="submit" type="primary" className="bg-primary">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
