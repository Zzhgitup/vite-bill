import React, { memo } from "react";
import { FC, ReactNode } from "react";
import "./index.less";
import { FriendsO, HomeO, Search } from "@react-vant/icons";
import { useNavigate } from "react-router-dom";
import { Tabbar } from "react-vant";
interface Props {
  children?: ReactNode;
  showNav: boolean;
}
const Navbar: FC<Props> = (props) => {
  const { showNav } = props;
  const navtion = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changepath(path: any) {
    console.log(path);
    navtion(path); //导航至目标
  }
  return (
    <>
      {showNav ? (
        <Tabbar fixed={true} onChange={(v) => changepath(v as string)}>
          <Tabbar.Item name="/" icon={<HomeO />}>
            账单
          </Tabbar.Item>
          <Tabbar.Item name="/date" icon={<Search />}>
            统计
          </Tabbar.Item>
          <Tabbar.Item name="/user" icon={<FriendsO />}>
            用户
          </Tabbar.Item>
        </Tabbar>
      ) : (
        ""
      )}
    </>
  );
};
export default memo(Navbar);
