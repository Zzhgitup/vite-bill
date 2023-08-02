import Header from "@/components/Header";
import React, { memo, useEffect, useState } from "react";
import { FC, ReactNode } from "react";
import "./style.less";
import { Button, Cell, Form, Input, Toast } from "react-vant";
import { editorpassword, getuserinfo } from "../../server";
import { userRoot } from "@/utils/type";
import { useNavigate } from "react-router-dom";
interface Props {
  children?: ReactNode;
}
const Password: FC<Props> = () => {
  const [userinfo, setuserinfo] = useState<userRoot>({
    username: "1090649095",
    id: 1,
    signature: "我命由我不由天   由茜茜",
    avater: "http://127.0.0.1:7002/public/upload/20230801/1690891274915.jpeg",
  });
  const navgiter = useNavigate();
  useEffect(() => {
    fetchuserinfo();
  }, []);
  const fetchuserinfo = async () => {
    const res = await getuserinfo();
    setuserinfo(res.data);
  };
  const onFinish = async (values: any) => {
    console.log(values);
    if (values.newpassword != values.newpassword2) {
      return Toast.fail("两次密码不一致");
    }
    const res = await editorpassword(values.oldpassword, values.newpassword);
    if (res.data == "重置成功") {
      Toast.success("修改成功");
      localStorage.removeItem("billtoken");
      navgiter("/login");
    } else {
      Toast.fail("原始密码错误");
    }
  };
  return (
    <div>
      <Header title="修改密码" />
      <Form
        onFinish={onFinish}
        footer={
          <div style={{ margin: "16px 16px 0" }}>
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          name="oldpassword"
          label="原始密码"
          rules={[
            {
              pattern: /^(.{7,15})$/,
              message: "请输入不小于6位的密码",
              required: true,
              type: "string",
            },
          ]}
        >
          <Input placeholder="正则校验" />
        </Form.Item>
        <Form.Item
          name="newpassword"
          label="新密码"
          rules={[
            {
              pattern: /^(.{7,15})$/,
              message: "请输入不小于6位的密码",
              required: true,
              type: "string",
              max: 16,
            },
          ]}
        >
          <Input placeholder="函数校验" />
        </Form.Item>
        <Form.Item
          label="在输入一次新密码"
          name="newpassword2"
          rules={[
            {
              pattern: /^(.{7,15})$/,
              message: "请输入不小于6位的密码",
              required: true,
              type: "string",
              max: 16,
            },
          ]}
        >
          <Input placeholder="请再输入一次面密码" />
        </Form.Item>
      </Form>
    </div>
  );
};
export default memo(Password);
