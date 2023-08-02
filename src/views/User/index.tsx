import React, { memo, useEffect, useState } from "react";
import { FC, ReactNode } from "react";
import "./style.less";
import { getuserinfo } from "./server";
import { userRoot } from "@/utils/type";
import { useNavigate } from "react-router-dom";
interface Props {
  children?: ReactNode;
}
const User: FC<Props> = () => {
  const navgiter = useNavigate();
  const [useinfo, setuseinfo] = useState<userRoot>({
    username: "1090649095",
    id: 1,
    signature: "修改信息，快点",
    avater: "",
  });
  useEffect(() => {
    fetchuseinfo();
  }, []);
  const fetchuseinfo = async () => {
    const { data } = await getuserinfo();
    setuseinfo(data);
  };
  return (
    <div className="user">
      <div className="topheader">
        <div className="useinfo">
          <span className="usename">昵称：{useinfo.username}</span>
          <span className="decreative">个性签名：{useinfo.signature}</span>
        </div>
        <img
          src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/03EB2FF031C32FA4EE89DF16188A55C9.jpg"
          alt=""
        />
      </div>
      <div className="iderban">
        <div className="item" onClick={() => navgiter("/userinfo")}>
          <img
            src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E6%9A%82%E6%97%A0%E5%AD%A6%E7%94%9F.png"
            alt=""
          />
          <span>更改信息</span>
          <span>{">"}</span>
        </div>
        <div className="item" onClick={() => navgiter("/password")}>
          <img
            src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E6%9A%82%E6%97%A0%E6%9D%83%E9%99%90.png"
            alt=""
          />
          <span>修改密码</span>
          <span>{">"}</span>
        </div>
        <div className="item">
          <img
            src="https://lmy-1311156074.cos.ap-nanjing.myqcloud.com/test/%E6%9A%82%E6%97%A0%E6%B6%88%E6%81%AF.png"
            alt=""
          />
          <span>关于我们</span>
          <span>{">"}</span>
        </div>
      </div>
    </div>
  );
};
export default memo(User);
