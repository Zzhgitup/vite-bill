import React, { memo, useState } from "react";
import { FC, ReactNode } from "react";
import "./style.less";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Selector, Toast } from "react-vant";
import { login, register } from "./server";
import Captcha from "react-captcha-code";
interface Props {
  children?: ReactNode;
}
const options = [
  {
    label: "登录",
    value: "true",
  },
  {
    label: "注册",
    value: "false",
  },
];
const Login: FC<Props> = () => {
  const [form] = Form.useForm();
  const navgiter = useNavigate();
  const [islogin, setlogin] = useState(true);
  const [Captch, setCaptch] = useState("");
  const [consentstate, consent] = useState(false);
  const [inputstr, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    if (islogin) {
      try {
        if (!consentstate) return Toast.fail("请同意条款");
        const res = await login(values.username, values.password);
        localStorage.setItem("billtoken", res.date.token);
        navgiter("/");
        return Toast.info(res.msg);
      } catch (error) {
        return Toast.fail("系统错误");
      }
    } else {
      try {
        if (!consentstate) return Toast.fail("请同意条款");
        if (Captch != inputstr) return Toast.fail("验证码错误");
        const res = await register(values.username, values.password);
        if (res.code == 200) {
          form.resetFields();
          return Toast.success("注册成功,请登录");
        } else if (res.code == 500) {
          return Toast.info("账号已被注册过");
        }
      } catch (error) {
        return Toast.fail("系统错误");
      }
    }
  };
  function changelogin(str: string[]) {
    setlogin(str[0] === "true" || str.length == 0);
  }
  return (
    <div className="login">
      <h1>记账本</h1>
      <Form.Item name="style" style={{ backgroundColor: "transparent" }}>
        <Selector
          style={{
            "--rv-selector-border-radius": "100px",
            "--rv-selector-checked-border": "",
            "--rv-selector-padding": "10px 15px",
            "--rv-selector-color": "transparent",
          }}
          onChange={changelogin}
          value={["true"]}
          showCheckMark={false}
          options={options}
          defaultValue={["true"]}
        />
      </Form.Item>
      <Form
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: "16px 16px 0" }}>
            <Button round nativeType="submit" type="primary" size="small" block>
              {islogin ? "登录" : "注册"}
            </Button>
          </div>
        }
      >
        <Form.Item
          tooltip={{
            message:
              "A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
          }}
          rules={[{ required: true, message: "请填写用户名" }]}
          name="username"
          label="用户名"
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "请填写密码" }]}
          name="password"
          label="密码"
        >
          <Input placeholder="请输入密码" />
        </Form.Item>
        {!islogin ? (
          <Form.Item
            rules={[{ required: true, message: "请填写验证码" }]}
            name="co"
            label="验证码"
            suffix={<Captcha charNum={4} onChange={setCaptch} />}
          >
            <Input onChange={setInput} placeholder="请输入验证码" />
          </Form.Item>
        ) : (
          ""
        )}
        <Checkbox
          style={{ justifyContent: "center", paddingTop: 30 + "px" }}
          shape="square"
          onChange={consent}
        >
          同意记账本条约
        </Checkbox>
      </Form>
    </div>
  );
};
export default memo(Login);
