import React, { ChangeEvent, memo, useEffect, useState } from "react";
import { FC, ReactNode } from "react";
import "./style.less";
import Header from "@/components/Header";
import { editoruser, getuserinfo, updated } from "../../server";
import { Toast } from "react-vant";
interface Props {
  children?: ReactNode;
}
const Userinfo: FC<Props> = () => {
  const [userinfo, setuseinfo] = useState({
    username: "1090649095",
    id: 1,
    signature: "修改信息，快点",
    avater: "",
  });
  const [avter, setAvter] = useState(""); //头像
  const [decreate, setdecreate] = useState(""); //签名
  useEffect(() => {
    fetchuserinfo();
  }, []);
  const fetchuserinfo = async () => {
    const { data } = await getuserinfo();
    setuseinfo(data);
    setAvter(data.avater);
    setdecreate(data.signature);
  };
  const fileupdae = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = e.target.files[0];
    if (files.size / 1024 > 500) {
      return Toast.fail("文件大小超过500KB");
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(files.type)) {
      return Toast.fail("文件格式不正确");
    }
    let fordate = new FormData();
    fordate.append("file", e.target.files[0]);
    const { date, code }: { date: string; code: number } = await updated(
      fordate
    );
    if (code == 200) {
      const str = date.replace(/\\/g, "/");
      setAvter(`http://127.0.0.1:7002${str}`);
      Toast.success("上传成功");
    }
  };
  const changedecreat = (e: ChangeEvent<HTMLInputElement>) => {
    setdecreate(e.target.value);
  };
  const commituser = async () => {
    const res = await editoruser(decreate, avter);
    if (res.code == 200) {
      Toast.success("更新成功");
    } else {
      Toast.fail("更新失败");
    }
  };
  return (
    <div className="userinfo">
      <Header title="用户信息" />
      <div className="user">
        <h1>个人信息</h1>
        <h3>头像</h3>
        <div className="userinfoavter">
          <div
            className="upavter"
            style={{ backgroundImage: `url(${avter})` }}
          ></div>
          <div className="rigthinfo">
            <p>支持上传jpg,png,jpeg格式，大小在500kb 以内的图片</p>
            <div className="buaddfile">
              点击上传
              <input type="file" onChange={fileupdae} />
            </div>
          </div>
        </div>
        <h2>个性签名</h2>
        <div className="decreatch">
          <input
            type="text"
            maxLength={30}
            onChange={changedecreat}
            value={decreate}
          />
        </div>
        <div className="updatebt">
          <button onClick={commituser} className="updateuserinfo">
            修改信息
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(Userinfo);
